import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../common/dto/create-user.dto';
import { LoginUserDTO } from '../common/dto/login-user.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('register')
    async register(@Body() body: CreateUserDTO) {
        return await this.authService.register(body);
    }

    @Public()
    @Post('login')
    async login(@Body() body: LoginUserDTO) {
        return await this.authService.login(body);
    }
}
