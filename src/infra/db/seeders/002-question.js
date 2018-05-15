module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Question', [{
      userId: 1,
      description: 'teste',
      points: 8
    }])
  }
}