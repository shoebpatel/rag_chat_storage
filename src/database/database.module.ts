import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './schema/users.entity';
import { Session } from './schema/sessions.entity';
import { Message } from './schema/messages.entity';

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
                    retryAttempts: 10,
                    retryDelay: 3000,
                    migrations: ['src/database/migrations/*.ts'],
                    synchronize: true, // false in production
                };
            },
        }),
        TypeOrmModule.forFeature([Users, Session, Message]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
