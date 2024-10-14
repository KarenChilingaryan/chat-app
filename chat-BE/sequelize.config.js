require('ts-node/register');
module.exports = require('./src/config/database.config.ts').default; // Explicitly use .default for the exported config
