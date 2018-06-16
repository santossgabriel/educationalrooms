module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Question', [{
      userId: 1,
      description: 'teste',
      points: 8,
      category: 'categoria teste 1'
    }, {
      userId: 2,
      description: 'teste2',
      points: 3,
      category: 'categoria 1'
    }, {
      userId: 1,
      description: 'teste',
      points: 8,
      shared: true,
      category: 'categoria 1'
    }, {
      userId: 3,
      description: 'teste',
      points: 8,
      shared: true,
      category: 'categoria 1'
    }, {
      userId: 2,
      description: 'teste',
      points: 8,
      shared: true,
      category: 'categoria 1'
    }, {
      userId: 3,
      description: 'teste',
      points: 8,
      shared: false,
      category: 'categoria 1'
    }])
  }
}