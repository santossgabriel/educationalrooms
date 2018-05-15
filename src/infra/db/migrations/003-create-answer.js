module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Answer', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: Sequelize.STRING,
      correct: Sequelize.BOOLEAN,
      questionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Question', key: 'id' }
      }
    }, {
        freezeTableName: 'Answer'
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Answer')
  }
}