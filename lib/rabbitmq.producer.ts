import * as amqp from 'amqplib';
import { Logger } from '@nestjs/common';

export class RabbitmqProducer {
  private readonly logger = new Logger(RabbitmqProducer.name);

  // use 10 seconds to retry connection
  private readonly RECONNECTION_DURATION = 10000;

  private connection!: amqp.Connection;
  private channel!: amqp.Channel;
  public inited = false;

  constructor(private readonly url: string, private readonly queue: string) {}

  async init() {
    this.connection = await amqp.connect(this.url);

    this.connection.on('error', async (error) => {
      this.logger.debug(`[AMQP] Connection error: ${error.message}`);
      await this.reconnect();
    });
    this.connection.on('close', async () => {
      this.logger.debug(`[AMQP] Producer Connection close with exception, should restart after seconds`);
      await this.reconnect();
    });

    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, {
      durable: true
    });
    this.logger.debug(`[AMQP] Producer Connection with ${this.queue} established`);
  }

  async send(message: any) {
    this.logger.debug(`[AMQP] Send message to queue: ${this.queue}`);
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
          this.logger.debug(`[AMQP] Producer reconnect successfully`);
        })
        .catch((error) => {
          this.logger.debug(`[AMQP] Producer reconnect fail with error: ${error.message}`);
          this.reconnect();
        });
    }, this.RECONNECTION_DURATION);
  }
}
