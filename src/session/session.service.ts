import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Session } from '../database/schema/sessions';
import { UpdateSessionDTO } from 'src/common/dto/update-session';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private sessionRepo: Repository<Session>,
        private userService: UserService,
    ) {}

    async findSessionByUserId(userId: string) {
        return await this.sessionRepo.findBy({ userId });
    }

    async findSession(sessionId: string) {
        return await this.sessionRepo.findOneBy({ id: sessionId });
    }

    async createSession(title, userId) {
        const user = await this.userService.getUserById(userId);
        if (!user) throw new NotFoundException({ message: 'User not found' });
        const session = this.sessionRepo.create({
            userId,
            title,
        });
        return this.sessionRepo.save(session);
    }

    async updateSession(sessionId: string, data: UpdateSessionDTO) {
        const session = await this.findSession(sessionId);
        if (!session)
            throw new NotFoundException({ message: 'Session not found' });
        const { title, isFavorite } = data;
        session.title = title ? title : session.title;
        session.isFavorite =
            isFavorite !== undefined ? isFavorite : session.isFavorite;
        return this.sessionRepo.save(session);
    }

    async deleteSession(sessionId: string) {
        const session = await this.findSession(sessionId);
        if (!session)
            throw new NotFoundException({ message: 'Session not found' });
        return this.sessionRepo.remove(session);
    }
}
