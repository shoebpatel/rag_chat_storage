import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector,
        private readonly sessionService: SessionService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        console.log('🚀 ~ AuthGuard ~ canActivate ~ isPublic:', isPublic);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const sessionId = request.params.id;
        console.log('🚀 ~ AuthGuard ~ canActivate ~ sessionId:', sessionId);
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            });
            if (sessionId) {
                const session = await this.sessionService.findSession(
                    sessionId,
                    payload.id,
                );
                if (!session) throw new NotFoundException();
                if (session.userId !== payload.id)
                    throw new ForbiddenException();
            }
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
