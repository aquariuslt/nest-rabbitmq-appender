import { RabbitmqAppenderModule } from '../rabbitmq-appender.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TEST_APPENDER_QUEUE, TEST_RMQ_URL } from '../__tests__/__fixtures__/test.rabbitmq.options';
import { RemoteLogger } from '../remote.logger';

describe('RabbitmqAppenderCoreModule', () => {
  it('# should be defined in sync imports', async () => {
    let module: RabbitmqAppenderModule;
    let logger: RemoteLogger;
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RabbitmqAppenderModule.register({
          url: TEST_RMQ_URL,
          queue: TEST_APPENDER_QUEUE
        })
      ]
    }).compile();

    module = app.get(RabbitmqAppenderModule);
    logger = app.get<RemoteLogger>(RemoteLogger);

    expect(module).toBeDefined();
    expect(logger).toBeDefined();
  });

  it('# should be defined in async imports', async () => {
    let module: RabbitmqAppenderModule;
    let logger: RemoteLogger;
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RabbitmqAppenderModule.forRootAsync({
          inject: [],
          useFactory: () => ({
            url: TEST_RMQ_URL,
            queue: TEST_APPENDER_QUEUE
          })
        })
      ]
    }).compile();

    module = app.get(RabbitmqAppenderModule);
    logger = app.get<RemoteLogger>(RemoteLogger);

    expect(module).toBeDefined();
    expect(logger).toBeDefined();
  });
});
