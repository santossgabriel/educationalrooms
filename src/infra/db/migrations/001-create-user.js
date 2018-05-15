module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('User', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: Sequelize.STRING
    }, {
        freezeTableName: 'User'
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('User')
  }
}