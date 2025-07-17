import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDTO } from 'src/common/dto/create-message';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post(':id')
    addMessage(@Body() validation: CreateMessageDTO, @Param('id') sessionId) {
        console.log(
            '🚀 ~ MessageController ~ addMessage ~ sessionId:',
            sessionId,
        );
        return this.messageService.addMessage(validation, sessionId);
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
