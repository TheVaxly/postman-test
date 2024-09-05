const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Routes for API
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
