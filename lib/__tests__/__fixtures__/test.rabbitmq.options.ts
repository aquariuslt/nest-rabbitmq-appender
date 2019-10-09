const createTestRmqUrl = () => {
  let TEST_RABBITMQ_HOST = 'localhost';
  if (process.env.CI) {
    TEST_RABBITMQ_HOST = 'test_rabbitmq';
  }

  return `amqp://devuser:devuser@${TEST_RABBITMQ_HOST}:5672`;
};

export const TEST_RMQ_URL = createTestRmqUrl();
export const TEST_APPENDER_QUEUE = 'TEST.LOGGING.QUEUE';
