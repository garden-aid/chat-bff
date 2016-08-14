
const secrets = require('./secrets.json');

require('./env')(secrets, true);

// Setup env vars before requiring functions
const slack = require('./src/slack');

module.exports.notify = slack.notify;
