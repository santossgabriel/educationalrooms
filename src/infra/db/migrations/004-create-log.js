import { modelName, modelAttributes, modelOptions } from '../models/log'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(modelName, modelAttributes, modelOptions)
  },
  down: function (queryInterface) {
    return queryInterface.dropTable(modelName)
  }
}