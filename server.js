const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const actorRoutes = require('./routes/actorRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/actors', actorRoutes);
app.use('/api/movies', movieRoutes);

// Database synchronization
(async () => {
    try {
        // First, drop all tables in correct order
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        
        console.log('Database tables created successfully 📝');
    } catch (error) {
        console.error('Database sync error:', error);
    }
})();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});