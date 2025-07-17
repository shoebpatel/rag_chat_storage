import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDTO } from 'src/common/dto/create-message';
import { Message } from 'src/database/schema/messages';
import { SessionService } from 'src/session/session.service';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepo: Repository<Message>,
        private sessionService: SessionService,
    ) {}
    async addMessage(validation: CreateMessageDTO, sessionId, userId) {
        const session =
            await this.sessionService.findSessionByUserIdAndSessionId(
                sessionId,
                userId,
            );
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
        const [messageHistories, count] = await this.messageRepo.findAndCount({
            where: { session: { id: sessionId } },
            order: { createdAt: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        console.log(
            '🚀 ~ MessageService ~ getMessages ~ messageHistories:',
            messageHistories,
        );
        return { total: count, page, limit, messageHistories };
    }
}
