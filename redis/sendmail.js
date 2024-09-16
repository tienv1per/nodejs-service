const express = require('express');
const app = express();

const redis = require('redis');
const subscribe = redis.createClient({
  url: 'redis://localhost:6379',
  username: 'default',
  password: 'tiennguyen1234',
});

// subscribe channel
subscribe.subscribe('ordersystem');
subscribe.on('message', (channel, message) => {
  console.log(`The channel for sendmail is ${channel}`);
  console.log(`The message is for sendmail ${JSON.parse(message)}`);
});

app.listen(3002, () => {
  console.log(`The sendmail service running at 3002`);
});