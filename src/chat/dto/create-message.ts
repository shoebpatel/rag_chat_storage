import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMessageValidations {
    @IsUUID()
    sessionId: string;

    @IsString()
    sender: 'user' | 'assistant';

    @IsString()
    content: string;

    @IsOptional()
    context?: any;
}
