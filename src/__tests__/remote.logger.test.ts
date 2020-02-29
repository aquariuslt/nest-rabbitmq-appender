import { RemoteLogger } from '../remote.logger';
import { Test, TestingModule } from '@nestjs/testing';
import { RABBITMQ_APPENDER_PRODUCER } from '../rabbitmq-appender.constants';
import { RabbitmqAppenderService } from '../rabbitmq-appender.service';
import { RabbitmqProducer } from '../rabbitmq.producer';

describe('RemoteLogger', () => {
  let remoteLogger: RemoteLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RABBITMQ_APPENDER_PRODUCER,
          useValue: new RabbitmqProducer(null, null)
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
    remoteLogger.warn(`log without hook function`);
    remoteLogger.error(`log without hook function`);
  });

  it('# should log with empty hook function', () => {
    remoteLogger.setHookFunction(() => {});
    remoteLogger.log(`log with empty hook function`);
    remoteLogger.warn(`log with empty hook function`);
    remoteLogger.error(`log with empty hook function`);
  });

  it('# should log with royal hook function', () => {
    remoteLogger.setHookFunction((message, context) => ({
      '@message': message,
      '@context': context
    }));
    remoteLogger.log(`log with royal hook function`);
    remoteLogger.warn(`log with royal hook function`);
    remoteLogger.error(`log with royal hook function`);
    remoteLogger.error(
      `log with royal hook function`,
      `exception happen
      at xxxx.js at line x
      at xxxx-parent.js at line y.
    `
    );
  });
});
