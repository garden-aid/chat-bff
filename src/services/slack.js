
const stampit = require('stampit');
const util = require('util');

const slackService = stampit()
  .refs({
    requestPromise: null,
    slackWebHookUrl: null,
  })
  .init((opts) => {
    const instance = opts.instance;
    if (!instance.requestPromise) {
      console.log('Missing ref: ', util.inspect(instance, false, 5));
      throw new Error('requestPromise is required');
    }
    if (!instance.slackWebHookUrl) {
      console.log('Missing ref: ', util.inspect(instance, false, 5));
      throw new Error('slackWebHookUrl is required');
    }
  })
  .methods({
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

module.exports = slackService;
