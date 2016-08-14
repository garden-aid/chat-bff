
'use strict';

const expect    = require('chai').expect;
const sinon     = require('sinon');
const rp        = require('request-promise');
const BbPromise = require('bluebird');

const SlackService = require('../../src/services/slack');

describe('#slack()', () => {
  let slackService = null;

  beforeEach(() => {
    sinon.stub(rp, 'post').returns(BbPromise.resolve());

    slackService = SlackService({
      requestPromise: rp,
      slackWebHookUrl: 'https://fake',
    });
  });

  describe('#notify()', () => {
    it('notify', () => {
        expect(() => slackService.notify('message')).to.not.throw;
    });
  });
});
