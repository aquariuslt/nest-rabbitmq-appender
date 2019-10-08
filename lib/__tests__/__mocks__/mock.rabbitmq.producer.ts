import { RabbitmqProducer } from '../../rabbitmq.producer';

const TEST_RMQ_URL = 'amqp://devuser:devuser@localhost:5673';
const TEST_APPENDER_QUEUE = 'TEST.LOGGING.QUEUE';

export class MockRabbitmqProducer extends RabbitmqProducer {
  constructor() {
    super(TEST_RMQ_URL, TEST_APPENDER_QUEUE);
  }
}
