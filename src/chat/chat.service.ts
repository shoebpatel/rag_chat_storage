// src/chat/chat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatSession } from './entities/chat-session';
import { ChatMessage } from './entities/chat-message';
import { CreateSessionValidations } from './validations/create-session';
import { CreateMessageValidations } from './validations/create-message';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatSession)
        private sessionRepo: Repository<ChatSession>,

        @InjectRepository(ChatMessage)
        private messageRepo: Repository<ChatMessage>,
    ) {}

    async createSession(validation: CreateSessionValidations) {
        const session = this.sessionRepo.create({
            userId: validation.userId,
            title: validation.title,
        });
        return this.sessionRepo.save(session);
    }

    // async renameSession(sessionId: string, title: string) {
    //     const session = await this.sessionRepo.findOneBy({ id: sessionId });
    //     if (!session) throw new NotFoundException('Session not found');
    //     session.title = title;
    //     return this.sessionRepo.save(session);
    // }

    // async markFavorite(sessionId: string, isFavorite: boolean) {
    //     const session = await this.sessionRepo.findOneBy({ id: sessionId });
    //     if (!session) throw new NotFoundException('Session not found');
    //     session.isFavorite = isFavorite;
    //     return this.sessionRepo.save(session);
    // }

    // async deleteSession(sessionId: string) {
    //     const session = await this.sessionRepo.findOneBy({ id: sessionId });
    //     if (!session) throw new NotFoundException('Session not found');
    //     return this.sessionRepo.remove(session);
    // }

    // async addMessage(validation: CreateMessageValidations) {
    //     const session = await this.sessionRepo.findOneBy({
    //         id: validation.sessionId,
    //     });
    //     if (!session) throw new NotFoundException('Session not found');
    //     const message = this.messageRepo.create({
    //         session,
    //         sender: validation.sender,
    //         content: validation.content,
    //         context: validation.context,
    //     });
    //     return this.messageRepo.save(message);
    // }

    // async getMessages(sessionId: string, page = 1, limit = 10) {
    //     const [messages, count] = await this.messageRepo.findAndCount({
    //         where: { session: { id: sessionId } },
    //         order: { createdAt: 'ASC' },
    //         skip: (page - 1) * limit,
    //         take: limit,
    //     });
    //     return { total: count, page, limit, messages };
    // }
}
