import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { BaseResponseDto } from '../dtos/responses/base.response.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../cqrs/queries/get-user-by-id.query';

export interface RequestWithUserId extends Request {
  userId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const accessToken = req.headers.authorization?.split(' ')[1];
    // Token이 없을 시
    if (!accessToken) {
      throw new HttpException(
        {
          code: 'FAIL',
          message: '토큰을 입력해주세요.',
          data: null,
        } as BaseResponseDto<void>,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const verifiedToken: any = jwt.verify(
        accessToken,
        process.env.JWT_SECRET,
      );
      const user = await this.queryBus.execute(
        new GetUserByIdQuery(verifiedToken.userId),
      );
      if (!user) {
        throw new HttpException(
          {
            code: 'FAIL',
            message: '유효한 토큰을 입력해주세요.',
            data: null,
          } as BaseResponseDto<void>,
          HttpStatus.BAD_REQUEST,
        );
      }
      req['userId'] = verifiedToken.userId as string;
      return true;
    } catch (error: any) {
      throw new HttpException(
        {
          code: 'FAIL',
          message: '유효한 토큰을 입력해주세요.',
          data: null,
        } as BaseResponseDto<void>,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
