const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Actor = require('model/Actor');
const Movie = require('model/Movie');

const ActorMovie = sequelize.define('ActorMovie', {
    role: {
        type: DataTypes.STRING
    }
});

Actor.belongsToMany(Movie, { through: ActorMovie });
Movie.belongsToMany(Actor, { through: ActorMovie });

module.exports = ActorMovie;