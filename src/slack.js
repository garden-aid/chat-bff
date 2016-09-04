
const BbPromise = require('bluebird');
const rp = require('request-promise');
const util = require('util');

const slackService = require('./services/slack.js');

const slack = slackService({
  requestPromise: rp,
  slackWebHookUrl: process.env.slackWebHookUrl,
});

module.exports.notify = (event, context, cb) =>  {
  console.log(util.inspect(event, false, 5));

  const promises = [];

  event.Records.forEach(function(record) {
    if(record.EventSource !== 'aws:sns') {
      console.warn('Recieved non sns event: ', record);
      return;
    }

    const notification = JSON.parse(record.Sns.Message);
    promises.push(slack.notify(notification.message));
  });

  return BbPromise.all(promises)
          .then(() => cb(null, { message: 'success' }))
          .catch(cb);
};
