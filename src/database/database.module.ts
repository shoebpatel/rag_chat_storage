import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './schema/users';
import { ChatSession } from './schema/sessions';
import { ChatMessage } from './schema/messages';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    username: configService.get<string>('DB_USER'),
                    password: configService.get<string>('DB_PASS'),
                    database: configService.get<string>('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: true, // false in production
                    retryAttempts: 10,
                    retryDelay: 3000,
                };
            },
        }),
        TypeOrmModule.forFeature([Users, ChatSession, ChatMessage]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
