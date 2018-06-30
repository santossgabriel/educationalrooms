module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Answer', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: Sequelize.STRING,
      correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Question', key: 'id' }
      },
      classification: Sequelize.CHAR(1)
    }, {
        freezeTableName: 'Answer',
        undercored: false,
        updatedAt: false,
        createdAt: false
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('Answer')
  }
}