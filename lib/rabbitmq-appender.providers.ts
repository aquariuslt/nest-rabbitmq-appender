import { RABBITMQ_APPENDER_OPTIONS, RABBITMQ_APPENDER_PRODUCER } from './rabbitmq-appender.constants';
import { RabbitmqAppenderAsyncOptions, RabbitmqAppenderOptions } from './rabbitmq-appender.options';
import { RabbitmqProducer } from './rabbitmq.producer';

export const createProducer = () => ({
  provide: RABBITMQ_APPENDER_PRODUCER,
  inject: [RABBITMQ_APPENDER_OPTIONS],
  useFactory: async (options: RabbitmqAppenderOptions) => {
    if (options.url === '' || options.queue === '') {
      return {
        inited: false // return a always false provider
      };
    }
    const producer = new RabbitmqProducer(options.url, options.queue);
    await producer.init();
    return producer;
  }
});

export const createAsyncProducerOptions = (options: RabbitmqAppenderAsyncOptions) => ({
  provide: RABBITMQ_APPENDER_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject
});
