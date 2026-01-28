const notFoundPage = async (req, res, next) => {
  res.status(404).json({ success: false, message: 'page not found' });
};

module.exports = notFoundPage;
