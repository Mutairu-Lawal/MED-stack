const errorHandler = async (err, req, res, next) => {
  res.status(500).json({ success: false, message: 'Internal server error' });
};

module.exports = errorHandler;
