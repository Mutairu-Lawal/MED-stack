const express = require('express');
const { query, validationResult, body, param } = require('express-validator');
const Book = require('../models/books');

const router = express.Router();

router
  .route('/')
  .get(
    query('page').default(1).isInt({ gt: 0 }),
    query('limit').default(10).isInt({ lt: 11 }),
    async (req, res) => {
      try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
          throw new Error('Invalid query');
        }

        const books = await Book.find()
          .skip((req.query.page - 1) * req.query.limit)
          .limit(req.query.limit);
        if (!books) {
          return res
            .status(404)
            .json({ success: false, message: error.message });
        }
        const { page, limit } = req.query;
        res.json({
          success: true,
          message: `return all books at page ${page ? page : 1} and limit ${limit ? limit : 100}`,
          data: books,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    },
  )
  .post(
    body('title').trim().toLowerCase().notEmpty().escape(),
    body('author').trim().toLowerCase().notEmpty().escape(),
    body('publishedYear').notEmpty().isInt({ gt: 1000 }).toInt(),
    async (req, res) => {
      try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
          return res.status(400).json({ errors: error.array() });
        }

        req.body.ISBN = Date.now().toString();

        const book = await Book.create(req.body);

        res.status(201).json({
          success: true,
          data: book,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    },
  );

router
  .route('/:id')
  .get(param('id').isInt(), async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        throw error;
      }

      const { id } = req.params;
      res.json({ success: true, data: id });
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  })
  .put(param('id').isInt(), async (req, res) => {
    try {
      res.json({ success: true, data: [] });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .delete(param('id').isInt(), async (req, res) => {
    try {
      res.json({ success: true, data: [] });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

module.exports = router;
