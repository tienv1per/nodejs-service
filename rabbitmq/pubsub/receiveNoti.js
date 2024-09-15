const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const receiveNoti = async() => {
  try {
    // create connect
    const connection = await amqplib.connect(amqp_url_docker);
    // create channel
    const channel = await connection.createChannel();
    // create exchange name
    const nameExchange = 'video';

    await channel.assertExchange(nameExchange, 'fanout', {
      durable: false,
    });
    // create queue
    const { queue } = await channel.assertQueue('', {
      exclusive: true // khi ko có consumer nào đăng ký queue này nữa thì nó sẽ bị xoá
    });
    console.log(`Name queue: ${queue}`);

    // bind queue
    await channel.bindQueue(queue, nameExchange, '');

    await channel.consume(queue, msg => {
      console.log(`Receive message: ${msg.content.toString()}`);
    }, {
      noAck: true,
    });
  } catch (error) {
    console.error(error);
  }
}

receiveNoti();