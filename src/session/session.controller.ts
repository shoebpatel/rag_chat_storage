import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
} from '@nestjs/common';
import { UpdateSessionDTO } from 'src/common/dto/update-session';
import { SessionService } from './session.service';
import { User } from 'src/common/decorator/user.decorator';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post()
    async createSession(@Body() { title }, @User('id') userId: string) {
        return await this.sessionService.createSession(title, userId);
    }

    @Get()
    async getUserSessions(@User('id') userId: string) {
        return await this.sessionService.findSessionByUserId(userId);
    }

    @Get(':id')
    async getSession(
        @Param('id') sessionId: string,
        @User('id') userId: string,
    ) {
        return await this.sessionService.findSession(sessionId, userId);
    }

    @Put(':id')
    async renameSession(
        @Param('id') sessionId: string,
        @Body() session: UpdateSessionDTO,
        @User('id') userId: string,
    ) {
        return await this.sessionService.updateSession(
            sessionId,
            session,
            userId,
        );
    }

    @Delete(':id')
    async deleteSession(
        @Param('id') sessionId: string,
        @User('id') userId: string,
    ) {
        return await this.sessionService.deleteSession(sessionId, userId);
    }
}
