const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    summary: {
        type: DataTypes.TEXT,
        allowNull: falase
    },
    author: {
        type: DataTypes.TEXT
    },
    createdOn: {
        type: DataTypes.DATE    
    },
    updatedOn: {
        type: DataTypes.DATE
    }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
    }
    );

module.exports = Comment;