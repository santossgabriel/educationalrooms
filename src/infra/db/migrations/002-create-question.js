module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Question', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: Sequelize.STRING,
      points: Sequelize.INTEGER,
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' }
      }
    }, {
        freezeTableName: 'Question'
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Question')
  }
}