import { modelName, modelAttributes, modelOptions } from '../models/answer'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(modelName, modelAttributes, modelOptions)
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Answer')
  }
}