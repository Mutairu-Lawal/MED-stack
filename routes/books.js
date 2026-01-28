const express = require('express');
const { query, validationResult, body, param } = require('express-validator');

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
        const { page, limit } = req.query;
        res.json({
          success: true,
          message: ` return all books at page ${page ? page : 1} and limt ${limit ? limit : 100}`,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    },
  )
  .post(
    body('title').trim().toLowerCase().notEmpty().escape(),
    body('author').trim().toLowerCase().notEmpty().escape(),
    body('publishedYears').trim().notEmpty().isInt({ gt: 1000 }),
    async (req, res) => {
      try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
          throw error;
        }
        const { title, author, publishedYears } = req.body;

        const newBook = {
          _id: 1,
          title,
          author,
          publishedYears,
          ISBN: new Date().toTimeString(),
          createdAt: new Date(),
        };
        res.status(201).json({
          success: true,
          data: newBook,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.errors });
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
