const createTestRmqUrl = () => {
  let TEST_RABBITMQ_URL = 'amqp://devuser:devuser@localhost:5672';
  if (process.env.CI && process.env.CI === 'true') {
    TEST_RABBITMQ_URL = process.env.RABBITMQ_URL;
  }

  console.log(`TEST_RABBITMQ_URL=${TEST_RABBITMQ_URL}`)
  return TEST_RABBITMQ_URL;
};

export const TEST_RMQ_URL = createTestRmqUrl();
export const TEST_APPENDER_QUEUE = 'TEST.LOGGING.QUEUE';
