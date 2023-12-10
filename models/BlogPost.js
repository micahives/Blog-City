const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    title: {
        type: DataTypes.STRING(75),
        allowNull: falase
    },
    summary: {
        type: DataTypes.TEXT
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
    modelName: 'blogPost'
    }
    );

module.exports = BlogPost;
