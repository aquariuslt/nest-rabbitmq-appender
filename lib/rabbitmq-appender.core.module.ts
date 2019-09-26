import { DynamicModule, Global, Module } from '@nestjs/common';
import { RABBITMQ_APPENDER_OPTIONS } from './rabbitmq-appender.constants';
import { RabbitmqAppenderAsyncOptions, RabbitmqAppenderOptions } from './rabbitmq-appender.options';
import { createAsyncProducerOptions, createProducer } from './rabbitmq-appender.providers';
import { RabbitmqAppenderService } from './rabbitmq-appender.service';

@Global()
@Module({
  providers: [RabbitmqAppenderService],
  exports: [RabbitmqAppenderService]
})
export class RabbitmqAppenderCoreModule {
  static register(options: RabbitmqAppenderOptions): DynamicModule {
    return {
      module: RabbitmqAppenderCoreModule,
      providers: [
        createProducer(),
        {
          provide: RABBITMQ_APPENDER_OPTIONS,
          useValue: options
        }
      ],
      exports: [RabbitmqAppenderService]
    };
  }

  static forRootAsync(options: RabbitmqAppenderAsyncOptions): DynamicModule {
    return {
      module: RabbitmqAppenderCoreModule,
      imports: options.imports,
      providers: [createProducer(), createAsyncProducerOptions(options)],
      exports: [RabbitmqAppenderService]
    };
  }
}
