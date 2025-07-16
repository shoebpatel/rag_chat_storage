import {
    Controller,
    Param,
    Get,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('me/:email')
    async getUserByEmailId(@Param('email') email: string) {
        const user = await this.userService.getUserByEmailId(email);
        if (!user) {
            throw new HttpException(
                { message: 'User not found' },
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }
}
