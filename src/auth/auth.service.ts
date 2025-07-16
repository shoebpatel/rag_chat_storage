import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from '../common/dto/create-user.dto';
import { LoginUserDTO } from '../common/dto/login-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}
    async register(body: CreateUserDTO) {
        try {
            const hash = await argon2.hash(body.password);
            const user = await this.userService.createUser({
                ...body,
                password: hash,
            });
            const payload = {
                sub: user.email,
                username: user.name,
                id: user.id,
            };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
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
            const passwordMatch = await argon2.verify(
                user.password,
                body.password,
            );
            if (!passwordMatch) {
                throw new HttpException(
                    { message: 'Invalid email or password' },
                    HttpStatus.UNAUTHORIZED,
                );
            }
            const payload = {
                sub: user.email,
                username: user.name,
                id: user.id,
            };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
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
