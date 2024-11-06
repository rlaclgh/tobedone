import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { SignUpRequestDto } from '../shared/dtos/requests/sign-up.request.dto';
import { SignUpResponseDto } from '../shared/dtos/responses/sign-up.response.dto';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './cqrs/queries/get-user-by-email.query';
import { User } from '@prisma/client';
import { CreateUserCommand } from './cqrs/commands/create-user.command';
import { SignInRequestDto } from '../shared/dtos/requests/sign-in.request.dto';
import { SignInResponseDto } from '../shared/dtos/responses/sign-in.response.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  createAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 10,
    });
  }

  async signUp(
    signUpRequestDto: SignUpRequestDto,
  ): Promise<BaseResponseDto<SignUpResponseDto>> {
    const { email, password } = signUpRequestDto;

    const user = await this.queryBus.execute<GetUserByEmailQuery, User>(
      new GetUserByEmailQuery(email),
    );

    if (user) {
      throw new HttpException(
        {
          code: 'FAIL',
          message: '이미 가입한 유저입니다.',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userId = uuidv4();
    const hashed = await this.hashPassword(password);

    await this.commandBus.execute(new CreateUserCommand(userId, email, hashed));

    return {
      code: 'SUCCESS',
      message: '회원가입이 완료되었습니다.',
      data: null,
    };
  }

  async signIn(
    signInRequestDto: SignInRequestDto,
  ): Promise<BaseResponseDto<SignInResponseDto>> {
    const { email, password } = signInRequestDto;

    const user = await this.queryBus.execute<GetUserByEmailQuery, User>(
      new GetUserByEmailQuery(email),
    );

    if (!user) {
      throw new HttpException(
        {
          code: 'FAIL',
          message: '로그인 정보를 확인해주세요.',
          data: null,
        } as BaseResponseDto<void>,
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        {
          code: 'FAIL',
          message: '로그인 정보를 확인해주세요.',
          data: null,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const accessToken = this.createAccessToken(user.id);

    return {
      code: 'SUCCESS',
      message: '로그인을 완료했습니다.',
      data: {
        accessToken,
      },
    };
  }
}
