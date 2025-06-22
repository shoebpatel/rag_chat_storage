import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    Query,
    Injectable,
    LoggerService,
    Inject,
    // UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateSessionValidations } from './validations/create-session';
import { CreateMessageValidations } from './validations/create-message';
// import { Authentication } from '../common/auth';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UpdateSessionValidations } from './validations/update-session';
// import { Throttle } from '@nestjs/throttler';

@Controller('chat')
// @UseGuards(Authentication)
@Injectable()
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
    ) {}

    @Post('sessions')
    // @Throttle({ default: { limit: 0, ttl: 6000000 } })
    createSession(@Body() session: CreateSessionValidations) {
        // throw new Error('Exception has been thrown');
        this.logger.log(`Creating session for user ${session.userId}`);
        return this.chatService.createSession(session);
    }

    @Put('sessions/:id/')
    renameSession(
        @Param('id') id: string,
        @Body() session: UpdateSessionValidations,
    ) {
        return this.chatService.updateSession(id, session);
    }

    @Delete('sessions/:id')
    deleteSession(@Param('id') id: string) {
        return this.chatService.deleteSession(id);
    }

    @Post('messages')
    addMessage(@Body() validation: CreateMessageValidations) {
        console.log('🚀 ~ ChatController ~ addMessage ~ validation:');
        return this.chatService.addMessage(validation);
    }

    @Get('sessions/:id/messages')
    getMessages(
        @Param('id') id: string,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        return this.chatService.getMessages(
            id,
            parseInt(page),
            parseInt(limit),
        );
    }
}
