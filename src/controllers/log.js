import db from '../infra/db/models/index'
import { throwForbiddenError } from '../helpers/error'
import { Languages } from '../helpers/utils'

const { Log } = db
const { EN, BR } = Languages

export default {

  getAll: async (req, res) => {
    if (req.claims.type !== 'A') {
      throwForbiddenError({ [EN]: 'Now allowed to view logs', [BR]: 'Sem permissão para visualizar logs.' })
    }

    res.json(await Log.findAll())
  }
}