module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Question', 'createdAt', {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date('01/01/1970')
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Question', 'createdAt')
}