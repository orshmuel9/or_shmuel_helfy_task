// this error handler middleware catches errors and sends a JSON response
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
}


module.exports = errorHandler;