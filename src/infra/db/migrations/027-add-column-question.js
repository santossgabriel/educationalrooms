module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Question',
    'sharedQuestionId', {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  ),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'sharedQuestionId'),
}