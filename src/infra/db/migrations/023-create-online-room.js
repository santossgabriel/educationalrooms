module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OnlineRoom', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Room', key: 'id' }
    },
    currentOrder: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    changedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OnlineRoom')
}