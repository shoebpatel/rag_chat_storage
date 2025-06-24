import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSession } from './entities/chat-session';
import { ChatMessage } from './entities/chat-message';
import { Users } from './entities/users';

@Module({
    imports: [TypeOrmModule.forFeature([Users, ChatSession, ChatMessage])],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}
