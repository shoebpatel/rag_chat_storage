import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Authentication } from './common/auth';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalGuards(new Authentication());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
