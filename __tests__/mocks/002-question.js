module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Question', [{
      userId: 1, // id = 1
      description: 'teste',
      difficulty: 1,
      shared: false,
      sync: '',
      area: 'Matemática',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2, // id = 2
      description: 'teste2',
      difficulty: 1,
      shared: false,
      sync: '',
      area: 'Matemática',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1, // id = 3
      description: 'teste',
      shared: true,
      difficulty: 1,
      sync: '',
      area: 'Matemática',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3, // id = 4
      description: 'teste',
      shared: true,
      difficulty: 1,
      sync: '',
      area: 'Matemática',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2, // id = 5
      description: 'teste',
      shared: true,
      difficulty: 1,
      sync: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      area: 'Matemática'
    }, {
      userId: 3, // id = 6
      description: 'teste',
      shared: false,
      difficulty: 1,
      area: 'Matemática',
      sync: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // id = 7
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: '', createdAt: new Date(), updatedAt: new Date() },
    // id = 8
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: '', createdAt: new Date(), updatedAt: new Date() },
    // id = 9
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: '', createdAt: new Date(), updatedAt: new Date() },
    // id = 10
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: '', createdAt: new Date(), updatedAt: new Date() },
    // id = 11
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: '', createdAt: new Date(), updatedAt: new Date() },
    // id = 12
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: '', createdAt: new Date(), updatedAt: new Date() },
    // id = 13
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'R', updatedAt: new Date(), createdAt: new Date() },
    // id = 14
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'U', updatedAt: new Date('1/1/2016'), createdAt: new Date('1/1/2016') },
    // id = 15
    { userId: 5, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'U', updatedAt: new Date(), createdAt: new Date() },
    // id = 16
    { userId: 6, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'U', updatedAt: new Date(), createdAt: new Date() },
    // id = 17
    { userId: 6, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'U', updatedAt: new Date(), createdAt: new Date() },
    // id = 18
    { userId: 6, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'U', updatedAt: new Date(), createdAt: new Date() },
    // id = 19
    { userId: 6, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'U', updatedAt: new Date(), createdAt: new Date() },
    // id = 20
    { userId: 6, description: 'teste', area: 'Matemática', shared: false, difficulty: 1, sync: 'U', updatedAt: new Date(), createdAt: new Date() }
    ])
  }
}