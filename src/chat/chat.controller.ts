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
import { Authentication } from '../common/auth';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
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
    createSession(@Body() validation: CreateSessionValidations) {
        // throw new Error('Exception has been thrown');
        this.logger.log(`Creating session for user ${validation.userId}`);
        return this.chatService.createSession(validation);
    }

    // @Put('sessions/:id/rename')
    // renameSession(@Param('id') id: string, @Body('title') title: string) {
    //     return this.chatService.renameSession(id, title);
    // }

    // @Put('sessions/:id/favorite')
    // markFavorite(
    //     @Param('id') id: string,
    //     @Body('isFavorite') isFavorite: boolean,
    // ) {
    //     return this.chatService.markFavorite(id, isFavorite);
    // }

    // @Delete('sessions/:id')
    // deleteSession(@Param('id') id: string) {
    //     return this.chatService.deleteSession(id);
    // }

    // @Post('messages')
    // addMessage(@Body() validation: CreateMessageValidations) {
    //     return this.chatService.addMessage(validation);
    // }

    // @Get('sessions/:id/messages')
    // getMessages(
    //     @Param('id') id: string,
    //     @Query('page') page = '1',
    //     @Query('limit') limit = '10',
    // ) {
    //     return this.chatService.getMessages(
    //         id,
    //         parseInt(page),
    //         parseInt(limit),
    //     );
    // }
}
