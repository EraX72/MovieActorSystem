const express = require('express');
const router = express.Router();
const Actor = require('../models/Actor');

// Tüm aktörleri getir
router.get('/', async (req, res) => {
    try {
        const actors = await Actor.findAll();
        res.json(actors || []); 
    } catch (error) {
        console.error('Actor fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Yeni aktör ekle
router.post('/', async (req, res) => {
    try {
        const actor = await Actor.create({
            name: req.body.name,
            birthDate: req.body.birthDate
        });
        res.status(201).json(actor);
    } catch (error) {
        console.error('Actor create error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Aktör sil
router.delete('/:id', async (req, res) => {
    try {
        const result = await Actor.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Actor deleted successfully' });
        } else {
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;