import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorator/user.decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('me')
    async getUserByEmailId(@User('id') userId: string) {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new HttpException(
                { message: 'User not found' },
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }
}
