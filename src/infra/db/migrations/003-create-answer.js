module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Answer', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      correct: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Question', key: 'id' }
      },
      classification: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: ''
      }
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