const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Tüm filmleri getir
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies || []);
    } catch (error) {
        console.error('Movie fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Yeni film ekle
router.post('/', async (req, res) => {
    try {
        const movie = await Movie.create({
            title: req.body.title,
            releaseYear: req.body.releaseYear
        });
        res.status(201).json(movie);
    } catch (error) {
        console.error('Movie create error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Film sil
router.delete('/:id', async (req, res) => {
    try {
        const result = await Movie.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Movie deleted successfully' });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;