import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    ThrottlerModule,
    ThrottlerGuard,
    ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { typeOrmConfig } from './common/db';
import { ChatModule } from './chat/chat.module';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './common/logger';
import { ExceptionsFilter } from './common/exception-filter';
import { Authentication } from './common/auth';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfig,
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): ThrottlerModuleOptions => {
                const ttl = config.get<number>('THROTTLE_TTL'); // 60000 milliseconds = 60 seconds
                const limit = config.get<number>('THROTTLE_LIMIT'); // 1
                console.log('TTL:', ttl, 'LIMIT:', limit);
                if (ttl === undefined || limit === undefined) {
                    throw new Error(
                        'THROTTLE_TTL or THROTTLE_LIMIT not defined',
                    );
                }
                return {
                    throttlers: [{ ttl, limit }],
                };
            },
        }),
        WinstonModule.forRoot(winstonLoggerConfig),
        ChatModule,
    ],
    // Globally providers: order matters here, they will apply in the order they're declared
    providers: [
        {
            provide: APP_GUARD,
            useClass: Authentication,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_FILTER,
            useClass: ExceptionsFilter,
        },
    ],
})
export class AppModule {}
