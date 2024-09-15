const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const sendQueue = async({ msg }) => {
  try {
    // create connect
    const connection = await amqplib.connect(amqp_url_docker);
    // create channel
    const channel = await connection.createChannel();
    // create name queue
    const nameQueue = 'q1';
    // create queue
    await channel.assertQueue(nameQueue, {
      // tránh mất hàng đợi khi server rabbitmq bị crash
      durable: true,
    });
    // send message to queue
    await channel.sendToQueue(nameQueue, Buffer.from(msg), {
      expiration: '10000', // TTL: 10s -> sau 10s ko có consumer nào consume -> tự động xoá message ra khỏi queue
      persistent: true, // message đc lưu trên disk để không mất dữ liệu khi restart
    });
    console.log("Send message sucessfully");
    // close channel
  } catch (error) {
    console.error(error);
  }
}

const msg = process.argv.slice(2).join(' ') || 'Nguyen Hung Tien';
sendQueue({ msg });