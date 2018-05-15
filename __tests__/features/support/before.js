import fs from 'fs'
import { BeforeAll } from 'cucumber'

import config from '../../../src/infra/config'
import sequelize, { Answer, User, Question } from '../../../src/infra/db/sequelize'

if (config.NODE_ENV === 'DEV' && fs.existsSync(config.DEV.storage))
  fs.unlinkSync(config.DEV.storage)

sequelize.sync()

BeforeAll(() => {
  const user1 = {
    name: 'question_mock_1',
    email: 'questionmock1@mail.com',
    password: '123qwe'
  }
  const user2 = {
    name: 'question_mock_2',
    email: 'questionmock2@mail.com',
    password: '123qwe'
  }
  const question = {
    userId: 1,
    description: 'teste',
    points: 8
  }
  User.create(user1)
  User.create(user2)
  User.sync()
  Question.create(question)
  Question.sync()
  Answer.sync()
})