const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const itemsRoutes = require('./routes/item');
app.use('/api/items', itemsRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
