const express = require('express');
const bookRouter = require('./routes/books');
const logger = require('./middlewares/logger');
const notFoundPage = require('./middlewares/notFoundPage');
const errorHandler = require('./middlewares/errorHandler');
const { rateLimit } = require('express-rate-limit');

const app = express();
const limiter = rateLimit({
  limit: 100, // limit per IP req
  windowMs: 10 * 60 * 1000, //total mins
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(limiter);

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.use('/api/books', bookRouter);

// error
app.use(notFoundPage);
app.use(errorHandler);

module.exports = app;
