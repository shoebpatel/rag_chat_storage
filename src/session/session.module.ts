import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SessionService } from './session.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [SessionController],
    providers: [SessionService],
    exports: [SessionService],
})
export class SessionModule {}
