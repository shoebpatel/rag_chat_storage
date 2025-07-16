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
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateSessionValidations } from './dto/create-session';
import { CreateMessageValidations } from './dto/create-message';
import { UpdateSessionValidations } from './dto/update-session';

@Controller('chat')
@Injectable()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('sessions')
    // @Throttle({ default: { limit: 0, ttl: 6000000 } })
    createSession(@Body() session: CreateSessionValidations) {
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
