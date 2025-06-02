const serverless = require('serverless-http');
const app = require('../index'); // this imports your real Express app

module.exports.handler = serverless(app);