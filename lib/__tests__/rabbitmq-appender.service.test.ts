import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqAppenderService } from '../rabbitmq-appender.service';
import { RABBITMQ_APPENDER_PRODUCER } from '../rabbitmq-appender.constants';
import { MockRabbitmqProducer } from '../__tests__/__mocks__/mock.rabbitmq.producer';

describe('RabbitmqAppenderService', () => {
  let service: RabbitmqAppenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RABBITMQ_APPENDER_PRODUCER,
          useValue: new MockRabbitmqProducer()
        },
        RabbitmqAppenderService
      ]
    }).compile();
    service = module.get<RabbitmqAppenderService>(RabbitmqAppenderService);
  });

  it('# should be defined', () => {
    expect(service).toBeDefined();
  });
});
