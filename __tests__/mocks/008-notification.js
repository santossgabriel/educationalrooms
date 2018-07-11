module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Notification', [{
      description: 'descrição da notificação 1',
      userId: 6,
      createdAt: new Date(),
      read: true
    }, {
      description: 'descrição da notificação 2',
      userId: 6,
      createdAt: new Date(),
      read: true
    }])
  }
}