// this logger middleware logs the method and URL of each request
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
}

module.exports = logger;