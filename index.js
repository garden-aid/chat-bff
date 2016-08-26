
const secrets = require('./secrets.json');

require('./env')(secrets, true);

// Setup env vars before requiring functions
const slack = require('./src/slack.js');
const iopipe = require('iopipe')({
   clientId: process.env.iopipeKey
});

module.exports.notify = iopipe(slack.notify);
