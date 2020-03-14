# NestJS RabbitMQ Logger Appender

[![NPM](https://img.shields.io/npm/v/nest-rabbitmq-appender.svg)](https://www.npmjs.com/package/nest-rabbitmq-appender) 
[![Github Workflow Status](https://github.com/aquariuslt/nest-rabbitmq-appender/workflows/ci/badge.svg)](https://github.com/aquariuslt/nest-rabbitmq-appender) 
[![Codecov](https://codecov.io/gh/aquariuslt/nest-rabbitmq-appender/branch/master/graph/badge.svg)](https://codecov.io/gh/aquariuslt/nest-rabbitmq-appender) [![Semantic-Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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

### Advanced Usage: Add Customize Data as HookFunction

`RemoteLogger` provided a public function: `setHookFunction(hookFn)` for advanced usage.

Mostly you want to add additional data when sending log data to remote message queue.

Like environment variables set from kubernetes (`POD_ID`,`POD_UID`...), or `NODE_ENV` in node.js application, 
or some dynamic value base on runtime status. 

You should use an `hookFunction` to create additional properties when send to rabbitmq.

```typescript
function hookFunction(message?:string, context?string){
  return {
    // calculate and return data according to your business logic
  }
}
```

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RemoteLogger } from 'nest-rabbitmq-appender';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  
  const remoteLogger = app.get(RemoteLogger);
  const hookFn = () => {
    return {
      NODE_ENV: process.env.NODE_ENV,
      NODE_IP: process.env.NODE_IP,
      // or any other data in context, it will merge with origin message
    }    
  };

  remoteLogger.setHookFunction(hookFn);
  app.useLogger(remoteLogger);

  await app.listen(3000);
}
bootstrap();
```


