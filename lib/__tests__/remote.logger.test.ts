import { RemoteLogger } from '../remote.logger';
import { Test, TestingModule } from '@nestjs/testing';
import { RABBITMQ_APPENDER_PRODUCER } from '../rabbitmq-appender.constants';
import { MockRabbitmqProducer } from '../__tests__/__mocks__/mock.rabbitmq.producer';
import { RabbitmqAppenderService } from '../rabbitmq-appender.service';

describe('RemoteLogger', () => {
  let remoteLogger: RemoteLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RABBITMQ_APPENDER_PRODUCER,
          useValue: new MockRabbitmqProducer()
        },
        RabbitmqAppenderService,
        RemoteLogger
      ]
    }).compile();

    remoteLogger = module.get<RemoteLogger>(RemoteLogger);
  });

  it('# should be defined', () => {
    expect(remoteLogger).toBeDefined();
  });

  it('# should log w/o hook function', () => {
    remoteLogger.log(`log without hook function`);
  });

  it('# should log with empty hook function', () => {
    remoteLogger.setHookFunction(() => {});
    remoteLogger.log(`log with empty hook function`);
  });

  it('# should log with royal hook function', () => {
    remoteLogger.setHookFunction((message, context) => ({
      '@message': message,
      '@context': context
    }));
    remoteLogger.log(`log with royal hook function`);
  });
});
