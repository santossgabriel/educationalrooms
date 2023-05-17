import db from '../infra/db/models/index'
import { throwForbiddenError } from '../helpers/error'
import { Languages } from '../helpers/utils'
import { AppRequest, AppResponse } from '../models/app.model'

const { Log } = db
const { EN, BR } = Languages

export default {

  getAll: async (req: AppRequest, res: AppResponse) => {
    if (req.claims.type !== 'A') {
      throwForbiddenError({ [EN]: 'Now allowed to view logs', [BR]: 'Sem permissão para visualizar logs.' })
    }

    res.json(await Log.findAll())
  }
}