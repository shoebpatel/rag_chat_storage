import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => {
    const host = configService.get<string>('DB_HOST');
    const port = configService.get<number>('DB_PORT');
    const username = configService.get<string>('DB_USER');
    const password = configService.get<string>('DB_PASS');
    const db = configService.get<string>('DB_NAME');

    console.log('🌐 Connecting to DB:', {
        host,
        port,
        username,
        password,
        db,
    });

    return {
        type: 'postgres',
        host,
        port,
        username,
        password,
        database: db,
        autoLoadEntities: true,
        synchronize: true, //false in production
        retryAttempts: 10,
        retryDelay: 3000,
    };
};
