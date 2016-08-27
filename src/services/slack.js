
const stampit = require('stampit');

const slackService = stampit()
  .refs({
    requestPromise: null,
    slackWebHookUrl: null,
  })
  .init((opts) => {
    const instance = opts.instance;
    if (!instance.requestPromise) {
      console.log('Missing ref: ', instance);
      throw new Error('requestPromise is required');
    }
    if (!instance.slackWebHookUrl) {
      console.log('Missing ref: ', instance);
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
