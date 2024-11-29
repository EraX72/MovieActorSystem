const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movie_actor_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: true,
        underscored: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    logging: console.log
});

// Test connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully 🎉');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

module.exports = sequelize;