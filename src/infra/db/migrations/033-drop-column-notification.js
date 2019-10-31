module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn('Notification', 'description'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Notification', 'description', {
    type: Sequelize.STRING,
    allowNull: false
  })
}