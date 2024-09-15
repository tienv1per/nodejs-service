const amqplib = require('amqplib');

const amqp_url_docker = 'amqp://localhost:5672';

const postVideo = async({ msg }) => {
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
    // publish video
    await channel.publish(nameExchange, '', Buffer.from(msg));

    console.log(`Send ok: ${msg}`);
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.error(error);
  }
}

const msg = process.argv.slice(2).join(' ') || 'Hello exchange';
postVideo({ msg });