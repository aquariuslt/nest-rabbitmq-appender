import { RabbitmqAppenderCoreModule } from '../rabbitmq-appender.core.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TEST_APPENDER_QUEUE, TEST_RMQ_URL } from '../__tests__/__fixtures__/test.rabbitmq.options';
import { RemoteLogger } from '../remote.logger';

describe('RabbitmqAppenderCoreModule', () => {
  let module: RabbitmqAppenderCoreModule;
  let logger: RemoteLogger;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RabbitmqAppenderCoreModule.register({
          url: TEST_RMQ_URL,
          queue: TEST_APPENDER_QUEUE
        })
      ]
    }).compile();

    module = app.get(RabbitmqAppenderCoreModule);
    logger = app.get<RemoteLogger>(RemoteLogger);
  });

  it('# should be defined', () => {
    expect(module).toBeDefined();
    expect(logger).toBeDefined();
  });
});
