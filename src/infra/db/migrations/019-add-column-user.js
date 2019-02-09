module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('User', 'google', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('User', 'google')
}