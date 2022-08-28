module.exports = (err, req, res, next) => {
  let error = { ...err };

  res.status(error.statusCode || 500).json({
    status: error.status || 'error',
    statusCode: error.statusCode || 500,
    operationalError: error.isOperational,
    message: error.message || 'Something is wrong',
});
};
