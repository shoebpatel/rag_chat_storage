import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SessionModule } from 'src/session/session.module';
import { MessageService } from './message.service';

@Module({
    imports: [DatabaseModule, SessionModule],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule {}
