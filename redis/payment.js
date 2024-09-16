const express = require('express');
const app = express();

const redis = require('redis');
const subscribe = redis.createClient({
  url: 'redis://localhost:6379',
  username: 'default',
  password: 'tiennguyen1234',
});
// subscribe.connect();

// subscribe channel
subscribe.subscribe('ordersystem');
subscribe.on('message', (channel, message) => {
  console.log(`The channel for payment is ${channel}`);
  console.log(`The message for payment is ${JSON.parse(message)}`);
});

app.listen(3001, () => {
  console.log(`The payment service running at 3001`);
});