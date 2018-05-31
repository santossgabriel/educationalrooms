import db from '../infra/db/models/index'
import { throwForbiddenError } from '../helpers/error'

const { Log } = db

export default {

  getAll: async (req, res) => {
    if (req.claims.type !== 'A') {
      throwForbiddenError('Sem permissão para visualizar logs.')
    }

    res.json(await Log.findAll())    
  }
}