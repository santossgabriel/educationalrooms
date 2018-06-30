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
    defaultValue: '',
  },
  type: {    
    type: Sequelize.CHAR(1),
    allowNull: false,
    defaultValue: ''
  },
  mobile: {    
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}