
const rp = require('request-promise');
const slackService = require('./services/slack.js');
const util = require('util');

const slack = slackService({
  requestPromise: rp,
  slackWebHookUrl: process.env.slackWebHookUrl,
});

module.exports.notify = (event, context, cb) =>  {// eslint-disable-line no-unused-vars
  console.log(util.inspect(event, false, 5));

  event.Records.forEach(function(record) {
    if(record.EventSource !== 'aws:sns') {
      console.warn('Recieved non sns event: ', record);
      return;
    }

    var notification = JSON.parse(record.Sns.Message);
    slack.notify(notification.message);
  });

  return cb(null, {
    message: 'success'
  });
};
