import Sequelize from 'sequelize'

export const modelName = 'RoomUser'

export const modelAttributes = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'Room', key: 'id' }
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'User', key: 'id' }
  },
  enteredIn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date('01/01/1970')
  },
  accepted: Sequelize.BOOLEAN,
  score: Sequelize.INTEGER
}

export const modelOptions = {
  freezeTableName: modelName,
  undercored: false,
  updatedAt: false,
  createdAt: false
}