import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from '../common/dto/create-user.dto';
import { LoginUserDTO } from '../common/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async register(body: CreateUserDTO) {
        try {
            const user = await this.userService.createUser(body);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error signing up user' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async login(body: LoginUserDTO) {
        try {
            const user = await this.userService.getUserByEmailId(body.email);
            if (!user) {
                throw new HttpException(
                    { message: 'Invalid email or password' },
                    HttpStatus.UNAUTHORIZED,
                );
            }
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error logging in user' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
