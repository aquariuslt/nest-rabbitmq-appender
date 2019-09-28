import { Injectable, Logger, Optional } from '@nestjs/common';
import { RabbitmqAppenderService } from './rabbitmq-appender.service';

@Injectable()
export class RemoteLogger extends Logger {
  private enabled = false;
  private remoteLoggingAppender: RabbitmqAppenderService;

  constructor(
    @Optional() context?: string,
    @Optional() isTimestampEnabled = false,
    @Optional() private readonly appender?: RabbitmqAppenderService
  ) {
    super(context, isTimestampEnabled);
    if (appender) {
      this.remoteLoggingAppender = appender;
    }
  }

  log(message: string, context?: string): void {
    super.log(message, context);
    this.enabled && this.remoteLoggingAppender.info(message, context);
  }

  warn(message: string, context?: string): void {
    super.warn(message, context);
    this.enabled && this.remoteLoggingAppender.warn(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    super.error(message, trace, context);
    this.enabled && this.remoteLoggingAppender.error(message, context, { trace: trace });
  }
}
