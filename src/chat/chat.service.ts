import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatSession } from '../database/schema/sessions';
import { ChatMessage } from '../database/schema/messages';
import { CreateSessionValidations } from './dto/create-session';
import { CreateMessageValidations } from './dto/create-message';
import { UpdateSessionValidations } from './dto/update-session';
import { Users } from '../database/schema/users';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>,

        @InjectRepository(ChatSession)
        private sessionRepo: Repository<ChatSession>,

        @InjectRepository(ChatMessage)
        private messageRepo: Repository<ChatMessage>,
    ) {}

    async findSession(sessionId: string) {
        console.log('🚀 ~ ChatService ~ findSession ~ sessionId:', sessionId);
        return await this.sessionRepo.findOneBy({ id: sessionId });
    }

    async findUser(userId: string) {
        console.log('🚀 ~ ChatService ~ findUser ~ userId:', userId);
        return await this.userRepo.findOneBy({ id: userId });
    }

    async createSession(validation: CreateSessionValidations) {
        const user = await this.findUser(validation.userId);
        if (!user) throw new NotFoundException('User not found');
        const session = this.sessionRepo.create({
            userId: validation.userId,
            title: validation.title,
        });
        return this.sessionRepo.save(session);
    }

    async updateSession(sessionId: string, data: UpdateSessionValidations) {
        const session = await this.findSession(sessionId);
        if (!session) throw new NotFoundException('Session not found');
        const { title, isFavorite } = data;
        session.title = title ? title : session.title;
        session.isFavorite =
            isFavorite !== undefined ? isFavorite : session.isFavorite;
        return this.sessionRepo.save(session);
    }

    async deleteSession(sessionId: string) {
        const session = await this.findSession(sessionId);
        if (!session) throw new NotFoundException('Session not found');
        return this.sessionRepo.remove(session);
    }

    async addMessage(validation: CreateMessageValidations) {
        const session = await this.findSession(validation.sessionId);
        if (!session) throw new NotFoundException('Session not found');
        const message = this.messageRepo.create({
            session,
            sender: validation.sender,
            content: validation.content,
            context: validation.context,
        });
        return this.messageRepo.save(message);
    }

    // Fetch messageHistories for a session, ordered by time
    async getMessages(sessionId: string, page = 1, limit = 10) {
        console.log(
            '🚀 ~ ChatService ~ getMessages ~  await this.messageRepo.findAndCount()',
            await this.messageRepo.findAndCount({
                where: { session: { id: sessionId } },
                order: { createdAt: 'ASC' },
            }),
        );
        const [messageHistories, count] = await this.messageRepo.findAndCount({
            where: { session: { id: sessionId } },
            order: { createdAt: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { total: count, page, limit, messageHistories };
    }
}
