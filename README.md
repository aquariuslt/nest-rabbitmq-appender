# NestJS RabbitMQ Logger Appender

[![NPM](https://img.shields.io/npm/v/nest-rabbitmq-appender.svg)](https://www.npmjs.com/package/nest-rabbitmq-appender) 
[![Github Workflow Status](https://github.com/aquariuslt/nest-rabbitmq-appender/workflows/ci/badge.svg)](https://github.com/aquariuslt/nest-rabbitmq-appender) 
[![codecov](https://codecov.io/gh/aquariuslt/nest-rabbitmq-appender/branch/master/graph/badge.svg)](https://codecov.io/gh/aquariuslt/nest-rabbitmq-appender) 
[![Semantic-Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Provide a rabbitmq logger appender like logback options style.

> Inspired by `spring-amqp` project

> Warning: In Beta

## Usage

### Installation

```shell script
yarn add nest-rabbitmq-appender
```

### Register Module

You should pass an AMQP connection option as register `RabbitmqAppenderModule` options at least with `url` and `queue`.

```typescript
export type RabbitmqAppenderOptions = {
  url: string; // rabbitmq connection url
  queue: string; // rabbitmq logging queue
} & Partial<Options.Connect>;
```


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
      useFactory: (config: ConfigService) => config.loggingAppenderOptions // config.loggingAppenderOptions suppose be type of `RabbitmqAppenderOptions`
    })
  ]
})
export class AppModule {}
```

### Use RemoteLogger extending NestJS Bundled logger

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RemoteLogger } from 'nest-rabbitmq-appender';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  app.useLogger(app.get(RemoteLogger));

  await app.listen(3000);
}
bootstrap();

```
