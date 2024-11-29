const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Actor = sequelize.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {  
        type: DataTypes.DATE
    }
}, {
    timestamps: true,
    underscored: true  
});

module.exports = Actor;