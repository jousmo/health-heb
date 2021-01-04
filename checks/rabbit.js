const amqplib = require('amqplib')

class RabbitCheck {
  constructor (config) {

    const CONFIG_RABBIT = {
      protocol: config.PROTOCOL,
      hostname: config.HOST,
      port: config.PORT_SERVICE,
      username: config.USER,
      password: config.PASSWORD,
      vhost: config.VHOST
    }

    return () => new Promise(async (resolve, reject) => {
      try {
        const connection = await amqplib.connect(CONFIG_RABBIT)
        const channel = await connection.createChannel()
        const { queue } = await channel.assertQueue('ping', { exclusive: true })
        await channel.sendToQueue(queue, Buffer.from('ping'))
        setTimeout(async () => {
          await connection.close()
        }, 500)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = RabbitCheck
