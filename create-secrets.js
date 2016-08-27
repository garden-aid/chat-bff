#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const iopipeKey = process.env.IOPIPE_KEY;
const slackWebHookUrl = process.env.SLACK_WEBHOOK_URL;

if (!iopipeKey) {
  throw new Error('Please set IOPIPE_KEY env var');
}

const secrets = {
  iopipeKey: iopipeKey,
  slackWebHookUrl: slackWebHookUrl
};

const secretsPath = path.resolve(__dirname, './secrets.json');
fs.writeFileSync(secretsPath, JSON.stringify(secrets));
