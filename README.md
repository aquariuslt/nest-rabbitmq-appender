# NestJS RabbitMQ Logger Appender

Provide a rabbitmq logger appender like logback options style.

> Inspired by `spring-amqp` project

> Warning: In Beta

## Usage

### Definition Custom Logger using Appender

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { RabbitmqAppenderService } from 'nest-rabbitmq-appender';

@Injectable()
export class RemoteLogger extends Logger {
  private remoteLoggingAppender: RabbitmqAppenderService;

  constructor(context, isTimestampEnabled) {
    super(context, isTimestampEnabled);
  }

  setAppender(appender: RabbitmqAppenderService) {
    this.remoteLoggingAppender = appender;
  }

  log(message: string, context?: string): void {
    super.log(message, context);
    this.remoteLoggingAppender.info(message, context);
  }

  warn(message: string, context?: string): void {
    super.warn(message, context);
    this.remoteLoggingAppender.warn(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    super.error(message, trace, context);
    this.remoteLoggingAppender.error(message, context, { trace: trace });
  }
}
```

### Register Module

```typescript
import { Module } from '@nestjs/common';
import { RabbitmqAppenderModule } from 'nest-rabbitmq-appender';
import { ConfigService } from '@/config/config.service';
import { RemoteLogger } from '@/remote.logger';

@Module({
  imports: [
    ConfigModule,
    RabbitmqAppenderModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.loggingAppenderOptions
    })
  ],
  providers: [RemoteLogger]
})
export class AppModule {}
```
