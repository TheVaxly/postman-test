const express = require('express');
const router = express.Router();

let items = [
    { id: 1, name: 'SUS', description: 'Red is sus' },
    { id: 2, name: 'AMGOUS', description: 'We are the sus' },
    { id: 3, name: 'IMPOSTOR', description: 'Black was the Impostor' }
];

// GET all items
router.get('/', (req, res) => {
    res.json(items);
});

// GET a specific item by id
router.get('/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// POST a new item
router.post('/', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT (update) an item by id
router.put('/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (item) {
        item.name = req.body.name || item.name;
        item.description = req.body.description || item.description;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE an item by id
router.delete('/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = router;
