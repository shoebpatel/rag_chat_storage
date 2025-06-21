import { IsString } from 'class-validator';

export class CreateSessionValidations {
    @IsString()
    userId: string;

    @IsString()
    title: string;
}
