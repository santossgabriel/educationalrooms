import fs from 'fs'
import { BeforeAll } from 'cucumber'

import config from '../../../src/infra/config'
import sequelize, { Answer, User, Question } from '../../../src/infra/db/sequelize'

if (config.NODE_ENV === 'DEV' && fs.existsSync(config.DEV.storage))
  fs.unlinkSync(config.DEV.storage)

sequelize.sync()

BeforeAll(() => {
  const user = {
    name: 'teste',
    email: 'teste@mail.com',
    password: '123qwe'
  }
  User.create(user)
  User.sync()
  Question.sync()
  Answer.sync()
})