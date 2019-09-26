import { DynamicModule, Module } from '@nestjs/common';
import { RabbitmqAppenderAsyncOptions, RabbitmqAppenderOptions } from './rabbitmq-appender.options';
import { RabbitmqAppenderCoreModule } from './rabbitmq-appender.core.module';

@Module({})
export class RabbitmqAppenderModule {
  static register(options: RabbitmqAppenderOptions): DynamicModule {
    return {
      module: RabbitmqAppenderModule,
      imports: [
        RabbitmqAppenderCoreModule.register(options)
      ]
    };
  }

  static forRootAsync(options: RabbitmqAppenderAsyncOptions): DynamicModule {
    return {
      module: RabbitmqAppenderModule,
      imports: [RabbitmqAppenderCoreModule.forRootAsync(options)]
    }
  }
}
