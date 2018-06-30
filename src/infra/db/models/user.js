import Sequelize from 'sequelize'

export const modelName = 'User'

export const modelAttributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    defaultValue: ''
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  type: {
    type: Sequelize.CHAR(1),
    allowNull: false,
    defaultValue: 'U'
  },
  mobile: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date('01/01/1970')
  },
  updatedAt: Sequelize.DATE
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}