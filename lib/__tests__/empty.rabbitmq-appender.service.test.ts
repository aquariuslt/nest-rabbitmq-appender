import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqAppenderService } from '../rabbitmq-appender.service';
import { RABBITMQ_APPENDER_PRODUCER } from '../rabbitmq-appender.constants';
import { RabbitmqProducer } from '../rabbitmq.producer';

describe('Mock RabbitmqAppenderService', () => {
  let service: RabbitmqAppenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RABBITMQ_APPENDER_PRODUCER,
          useValue: new RabbitmqProducer(null, null)
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
