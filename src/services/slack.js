
'use strict';

const stampit = require('stampit');

const SlackService = stampit().
  refs({
    requestPromise: null,
    slackWebHookUrl: null
  }).
  init((opts) => {
    const instance = opts.instance;
    if(!instance.requestPromise) throw new Error('requestPromise is required');
    if(!instance.slackWebHookUrl) throw new Error('slackWebHookUrl is required');
  }).
  methods({
    notify(msg) {
      const options = {
        method: 'POST',
        uri: this.slackWebHookUrl,
        json: true,
        body: {
          text: msg,
        },
      };

      return this.requestPromise(options);
    },
  });

module.exports = SlackService;
