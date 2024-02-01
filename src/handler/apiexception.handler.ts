import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ExceptionResponse } from 'src/models/exception.model';
import { Request, Response } from 'express';

@Catch()
export class ApiExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const code = exception.getStatus();
    const apiResponse: ExceptionResponse = {
      errorMessage: exception.message,
      path: req.url,
    };
    resp.statusCode = code;
    resp.json(apiResponse);
  }
}
