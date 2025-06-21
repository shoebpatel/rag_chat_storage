import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class Authentication implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        console.log(
            '🚀 ~ Authentication ~ canActivate ~ context.getHandler():',
            context.getHandler(),
        );
        const req = context.switchToHttp().getRequest();
        console.log(
            '🚀 ~ ApiKeyGuard ~ canActivate ~ req:',
            req.headers['x-api-key'],
        );
        const apiKey = req.headers['x-api-key'];
        return apiKey === process.env.API_KEY;
    }
}
