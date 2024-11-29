const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseYear: { 
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true,
    underscored: true  
});

module.exports = Movie;