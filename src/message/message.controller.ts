import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDTO } from 'src/common/dto/create-message';
import { User } from 'src/common/decorator/user.decorator';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post(':id')
    addMessage(
        @Body() validation: CreateMessageDTO,
        @Param('id') sessionId,
        @User('id') userId,
    ) {
        console.log(
            '🚀 ~ MessageController ~ addMessage ~ sessionId:',
            sessionId,
        );
        return this.messageService.addMessage(validation, sessionId, userId);
    }

    @Get(':id')
    getMessages(
        @Param('id') sessionId: string,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        return this.messageService.getMessages(
            sessionId,
            parseInt(page),
            parseInt(limit),
        );
    }
}
