module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Question', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date('01/01/1970')
    })
    queryInterface.addColumn('Question', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date('01/01/1970')
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Question', 'createdAt')
    queryInterface.removeColumn('Question', 'updatedAt')
  }
}