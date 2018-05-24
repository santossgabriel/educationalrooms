module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Question', [{
      userId: 1,
      description: 'teste',
      points: 8
    }, {
      userId: 2,
      description: 'teste2',
      points: 3
    }, {
      userId: 1,
      description: 'teste',
      points: 8,
      shared: true
    }])
  }
}