'use strict';

const rp = require('request-promise');
const SlackService = require('./services/slack');

const slack = SlackService({
  requestPromise: rp,
  slackWebHookUrl: process.env.slackWebHookUrl
});

module.exports.notify = (evt, context, cb) => {
  return slack.notify(evt.message);
};
