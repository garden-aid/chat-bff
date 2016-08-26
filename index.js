
const secrets = require('./secrets.json');

require('./env')(secrets, false);

// Setup env vars before requiring functions
const slack = require('./src/slack.js');
const iopipe = require('iopipe')({
   clientId: process.env.iopipe.key
});

module.exports.notify = iopipe(slack.notify);
