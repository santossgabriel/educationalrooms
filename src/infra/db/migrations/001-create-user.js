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
      password: Sequelize.STRING,
      type: Sequelize.CHAR(1)
    }, {
        freezeTableName: 'User',
        undercored: false,
        updatedAt: false,
        createdAt: false
      })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('User')
  }
}