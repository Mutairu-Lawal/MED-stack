const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      unique: true,
    },
    publishedYear: {
      type: Number,
      min: [1000, 'Year must be greater than 1000'],
    },
  },
  { timestamps: true },
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
