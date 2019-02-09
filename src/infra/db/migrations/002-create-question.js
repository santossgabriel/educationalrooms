module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Question', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'User', key: 'id' }
    },
    shared: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
      freezeTableName: 'User',
      undercored: false,
      updatedAt: false,
      createdAt: false
    }),
  down: (queryInterface) => queryInterface.dropTable('Question')
}