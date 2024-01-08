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
        allowNull: false
    },
    summary: {
        type: DataTypes.TEXT
    },
    author: {
        type: DataTypes.TEXT
    },
    postDate: {
        type: DataTypes.DATE ,
        defaultValue: DataTypes.NOW   
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
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
