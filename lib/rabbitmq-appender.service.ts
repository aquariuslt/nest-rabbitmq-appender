import { Inject, Injectable } from '@nestjs/common';
import { RABBITMQ_APPENDER_PRODUCER } from './rabbitmq-appender.constants';
import { RabbitmqProducer } from './rabbitmq.producer';
import { createDatePartition } from './utils/message.util';
import { getPodInfo } from './utils/kubernetes.env.util';

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

@Injectable()
export class RabbitmqAppenderService {
  private readonly podInfo = getPodInfo();

  constructor(@Inject(RABBITMQ_APPENDER_PRODUCER) private readonly producer: RabbitmqProducer) {}

  info(message, context, meta?) {
    this.producer.inited && this.producer.send(this.createMessage(LogLevel.INFO, message, context, meta));
  }

  warn(message, context, meta?) {
    this.producer.inited && this.producer.send(this.createMessage(LogLevel.WARN, message, context, meta));
  }

  error(message, context, meta?) {
    this.producer.inited && this.producer.send(this.createMessage(LogLevel.ERROR, message, context, meta));
  }

  private createMessage(level: string, message: string, context: string, meta?: object) {
    return {
      ...meta,
      ...this.podInfo,
      '@level': level,
      '@context': context,
      day: createDatePartition(),
      message
    };
  }
}
