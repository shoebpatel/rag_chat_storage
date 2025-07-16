import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('🚀 ~ ExceptionsFilter ~ exception:', exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception;
        response.status(status).json({
            statusCode: status,
            message: Array.isArray(message['message'])
                ? message['message'][0]
                : message['message'],
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
