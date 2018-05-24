import { modelName, modelAttributes, modelOptions } from '../models/question'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(modelName, modelAttributes, modelOptions)
  },
  down: function (queryInterface) {
    return queryInterface.dropTable(modelName)
  }
}