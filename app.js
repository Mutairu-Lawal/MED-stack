const express = require('express');
const bookRouter = require('./routes/books');
const logger = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.use('/api/books', bookRouter);

module.exports = app;
