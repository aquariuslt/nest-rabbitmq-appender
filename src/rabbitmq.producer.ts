import * as amqp from 'amqplib';
import * as d from 'debug';

const debug = d('rabbitmq-producer');

export class RabbitmqProducer {
  // use 10 seconds to retry connection
  private readonly RECONNECTION_DURATION = 10000;

  private connection!: amqp.Connection;
  private channel!: amqp.Channel;
  public inited = false;

  constructor(private readonly url: string, private readonly queue: string) {}

  async init() {
    this.connection = await amqp.connect(this.url);

    this.connection.on('error', async (error) => {
      debug(`[AMQP] Connection error: ${error.message}`);
      await this.reconnect();
    });
    this.connection.on('close', async () => {
      debug(`[AMQP] Producer Connection close with exception, should restart after seconds`);
      await this.reconnect();
    });

    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, {
      durable: true
    });
    this.inited = true;
    debug(`[AMQP] Producer Connection with ${this.queue} established`);
  }

  async send(message: any) {
    debug(`[AMQP] Send message to queue: ${this.queue}`);
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
  }

  public close() {
    this.channel && this.channel.close();
    this.connection && this.connection.close();
  }

  private async reconnect() {
    setTimeout(() => {
      this.init()
        .then(() => {
          debug(`[AMQP] Producer reconnect successfully`);
        })
        .catch((error) => {
          debug(`[AMQP] Producer reconnect fail with error: ${error.message}`);
          this.reconnect();
        });
    }, this.RECONNECTION_DURATION);
  }
}
