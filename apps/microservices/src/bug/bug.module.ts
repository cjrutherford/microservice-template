import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReverseProxyMiddleware } from '../proxy.middleware'
import { BugController } from './bug/bug.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [BugController]
})
export class BugModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ReverseProxyMiddleware)
            .forRoutes(BugController);
    }
}
