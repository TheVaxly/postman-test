const express = require('express');
const router = express.Router();

let items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' }
];

// GET all items
router.get('/', (req, res) => {
    res.json(items);
});

// POST new item
router.post('/', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PATCH (partially update) an item by id
router.patch('/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (item) {
        if (req.body.name !== undefined) item.name = req.body.name;
        if (req.body.description !== undefined) item.description = req.body.description;
        res.json({ message: 'Item partially updated', updatedItem: item });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE an item by id
router.delete('/:id', (req, res) => {
    items = items.filter(i => i.id != req.params.id);
    res.json({ message: 'Item deleted' });
});

module.exports = router;
