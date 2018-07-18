module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OnlineRoom', {
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
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('OnlineRoom')
  }
}