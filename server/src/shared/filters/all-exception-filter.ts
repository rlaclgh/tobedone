import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // 직접 제어한 에러라면
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      if (typeof errorResponse === 'object' && 'code' in errorResponse) {
        return response
          .status(exception.getStatus())
          .json(exception.getResponse());
      }
    }

    // JSON parse Error
    if (exception instanceof HttpException) {
      if (
        exception.message.includes(
          'Bad control character in string literal in JSON at position',
        )
      ) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          code: 'FAIL',
          message: 'JSON parse error',
          data: null,
        });
      }
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 'FAIL',
      message: 'INTERNAL_SERVER_ERROR',
      data: null,
    });
  }
}
