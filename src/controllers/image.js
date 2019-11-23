import HttpStatus from 'http-status'
import sha1 from 'sha1'
import Dropbox from 'dropbox'
import fs from 'fs'
import path from 'path'
import config from '../infra/config'
import Multer from 'multer'

import sequelize from '../infra/db/models/index'

const { User, Log } = sequelize

const _500KB = 500 * 1024

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: _500KB
  }
}).single('image')

const dbx = new Dropbox({ accessToken: config.DROPBOX_TOKEN })
const generateHashFile = (fileName) => {
  return sha1(new Date()).substring(0, 8) + fileName.toLowerCase()
}

const dropboxFileNames = async() => {
  const response = await dbx.filesListFolder({ path: '' })
  let names = []
  for (let i = 0; i < response.entries.length; i++)
    names.push(response.entries[i].name)
  return names
}

const existsInDropBox = async(name) => {
  const names = await dropboxFileNames()
  return !!names.find(p => p === name)
}

const removeFile = async(name) => {
  if (existsInDropBox(name))
    dbx.filesDelete(name)
}

export default {

  get: async(req, res) => {
    const { name } = req.params

    const filePath = path.join(__dirname, '../../temp', name)
    try {
      if (fs.existsSync(filePath))
        return res.sendFile(filePath, { root: '/' })

      const exists = await existsInDropBox(name)
      if (exists) {
        const file = await dbx.filesDownload({ path: '/' + name })
        fs.writeFileSync(filePath, file.fileBinary, 'binary')
        res.sendFile(filePath, { root: '/' })
      } else {
        res.status(HttpStatus.NOT_FOUND)
        res.end('File not found.')
      }
    } catch (ex) {
      res.status(HttpStatus.NOT_FOUND)
      res.end('File not found.')
      const { status, text } = ex.response || {}
      Log.create({ date: new Date(), description: JSON.stringify({ status, text }) })
    }
  },

  getAllImageNames: async(req, res) => {
    res.json(await dropboxFileNames())
  },

  createImagePerfil: async(req, res) => {
    upload(req, res, async err => {
      if (err) {
        const errSize = err.message === 'File too large'
        res.status(422).end(errSize ? 'Imagem não pode exceder 500KB.' : err.message)
        return
      }

      const user = await User.findOne({ where: { id: req.claims.id } })

      const fileName = generateHashFile(req.file.originalname)
      await dbx.filesUpload({ path: '/' + fileName, contents: req.file.buffer })
      await User.update({ picture: `api/image/${fileName}` }, { where: { id: req.claims.id } })
      res.json({ fileName: fileName })

      try {
        if (user.picture)
          await removeFile(user.picture)
      } catch (ex) {}
    })
  }
}
