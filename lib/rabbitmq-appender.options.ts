import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Options } from 'amqplib';

export type RabbitmqAppenderOptions = {
  url: string; // rabbitmq connection url
  queue: string; // rabbitmq logging queue
} & Partial<Options.Connect>;

export interface RabbitmqAppenderAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => RabbitmqAppenderOptions | Promise<RabbitmqAppenderOptions>;
  inject?: any[];
}
