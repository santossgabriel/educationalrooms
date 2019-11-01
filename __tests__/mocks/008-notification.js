module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Notification', [{
      userId: 6,
      createdAt: new Date(),
      read: true
    }, {
      userId: 6,
      createdAt: new Date(),
      read: true
    }, {
      userId: 1,
      createdAt: new Date(),
      read: true
    }, {
      userId: 6,
      createdAt: new Date(),
      read: true
    }])
  }
}