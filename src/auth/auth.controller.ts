import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../common/dto/create-user.dto';
import { LoginUserDTO } from '../common/dto/login-user.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Post('register')
    async register(@Body() body: CreateUserDTO) {
        const hash = await argon2.hash(body.password);
        const user = await this.authService.register({
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
    }

    @Post('login')
    async login(@Body() body: LoginUserDTO) {
        const user = await this.authService.login(body);
        const passwordMatch = await argon2.verify(user.password, body.password);
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
    }
}
