import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqAppenderService } from '../rabbitmq-appender.service';
import { RABBITMQ_APPENDER_PRODUCER } from '../rabbitmq-appender.constants';
import { RabbitmqProducer } from '../rabbitmq.producer';
import { TEST_APPENDER_QUEUE, TEST_RMQ_URL } from '../__tests__/__fixtures__/test.rabbitmq.options';

describe('RabbitmqAppenderService', () => {
  let producer: RabbitmqProducer;
  let service: RabbitmqAppenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RABBITMQ_APPENDER_PRODUCER,
          useValue: new RabbitmqProducer(TEST_RMQ_URL, TEST_APPENDER_QUEUE)
        },
        RabbitmqAppenderService
      ]
    }).compile();

    producer = module.get<RabbitmqProducer>(RABBITMQ_APPENDER_PRODUCER);
    service = module.get<RabbitmqAppenderService>(RabbitmqAppenderService);

    await producer.init();
  });

  afterEach( () => {
    if (producer.inited) {
      producer.close();
    }
  });

  it('# should be defined', () => {
    expect(service).toBeDefined();
  });
});
