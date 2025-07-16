import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSession } from '../database/schema/sessions';
import { ChatMessage } from '../database/schema/messages';
import { Users } from '../database/schema/users';

@Module({
    imports: [TypeOrmModule.forFeature([Users, ChatSession, ChatMessage])],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}
