const express = require('express');
const app = express();

const redis = require('redis');
const publish = redis.createClient({
  url: 'redis://localhost:6379',
  username: 'default',
  password: 'tiennguyen1234',
});

app.get('/order', async(req, res) => {
  const orders = [
    {
      productId: 1,
      price: 5000,
    },
    {
      productId: 2,
      price: 2000,
    },
  ];

  await publish.connect();

  // payment & send mail
  publish.publish('ordersystem', JSON.stringify(orders));

  res.json({
    status: "Success  ",
    message: "Thanks",
  });
});

app.listen(3000, () => {
  console.log(`The order service running at 3000`);
});