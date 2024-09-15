const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const receiveQueue = async() => {
  try {
    // create connect
    const connection = await amqplib.connect(amqp_url_docker);
    // create channel
    const channel = await connection.createChannel();
    // create name queue
    const nameQueue = 'q1';
    // create queue
    await channel.assertQueue(nameQueue, {
      // tránh mất hàng đợi khi server bị crash
      durable: true,
    });
    // receive message from queue
    await channel.consume(nameQueue, msg => {
      console.log(`Message content: ${msg.content.toString()}`);
    }, {
      // client xác nhận đã nhận được message hay chưa
      noAck: false,
    });
    // close channel
  } catch (error) {
    console.error(error);
  }
}

receiveQueue();