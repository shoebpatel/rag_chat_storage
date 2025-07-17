import { IsOptional, IsString } from 'class-validator';

export class CreateMessageDTO {
    @IsString()
    sender: 'user' | 'assistant';

    @IsString()
    content: string;

    @IsOptional()
    context?: any;
}
