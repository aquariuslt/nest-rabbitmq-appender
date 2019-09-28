import { DynamicModule, Global, Module } from '@nestjs/common';
import { RABBITMQ_APPENDER_OPTIONS } from './rabbitmq-appender.constants';
import { RabbitmqAppenderAsyncOptions, RabbitmqAppenderOptions } from './rabbitmq-appender.options';
import { createAsyncProducerOptions, createProducer } from './rabbitmq-appender.providers';
import { RabbitmqAppenderService } from './rabbitmq-appender.service';
import { RemoteLogger } from './remote.logger';

@Global()
@Module({
  providers: [RabbitmqAppenderService],
  exports: [RabbitmqAppenderService, RemoteLogger]
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
        },
        RemoteLogger
      ],
      exports: [RabbitmqAppenderService, RemoteLogger]
    };
  }

  static forRootAsync(options: RabbitmqAppenderAsyncOptions): DynamicModule {
    return {
      module: RabbitmqAppenderCoreModule,
      imports: options.imports,
      providers: [createProducer(), createAsyncProducerOptions(options), RemoteLogger],
      exports: [RabbitmqAppenderService, RemoteLogger]
    };
  }
}
