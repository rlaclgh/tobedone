import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from '../shared/dtos/requests/sign-up.request.dto';
import { SwaggerResponse } from '../shared/decorators/swagger-response';
import { SignUpResponseDto } from '../shared/dtos/responses/sign-up.response.dto';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';
import { SignInRequestDto } from '../shared/dtos/requests/sign-in.request.dto';
import { SignInResponseDto } from '../shared/dtos/responses/sign-in.response.dto';
import { EmptyResponseDto } from '../shared/dtos/responses/empty.response.dto';
import { AuthGuard, RequestWithUserId } from '../shared/guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '회원가입',
    description: '이메일과 비밀번호로 로그인 하는 API입니다.',
  })
  @SwaggerResponse(SignUpResponseDto, {
    statusCode: HttpStatus.CREATED,
    description: '회원가입 성공',
    message: '회원가입이 완료되었습니다.',
  })
  @SwaggerResponse(SignUpResponseDto, {
    statusCode: HttpStatus.BAD_REQUEST,
    description: '이미 가입한 경우',
    message: '이미 가입한 유저입니다.',
  })
  signUp(
    @Body() signUpRequestDto: SignUpRequestDto,
  ): Promise<BaseResponseDto<SignUpResponseDto>> {
    return this.authService.signUp(signUpRequestDto);
  }

  @Post('/sign-in')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인 하는 API입니다.',
  })
  @HttpCode(HttpStatus.OK)
  @SwaggerResponse(SignInResponseDto, {
    statusCode: HttpStatus.OK,
    description: '로그인 성공',
    message: '로그인을 완료했습니다.',
  })
  @SwaggerResponse(EmptyResponseDto, {
    statusCode: HttpStatus.NOT_FOUND,
    description: '가입안한 이메일',
    message: '로그인 정보를 확인해주세요.',
  })
  @SwaggerResponse(EmptyResponseDto, {
    statusCode: HttpStatus.FORBIDDEN,
    description: '비밀번호가 틀렸을 때',
    message: '로그인 정보를 확인해주세요.',
  })
  signIn(
    @Body() signInRequestDto: SignInRequestDto,
  ): Promise<BaseResponseDto<SignInResponseDto>> {
    return this.authService.signIn(signInRequestDto);
  }

  @Post('/check')
  @ApiOperation({
    summary: '로그인 확인',
    description: 'accessToken으로 로그인 확인 하는 API입니다.',
  })
  @SwaggerResponse(EmptyResponseDto, {
    statusCode: HttpStatus.OK,
    description: '정상적으로 로그인 된 경우',
    message: '로그인을 확인했습니다.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  check(@Req() req: RequestWithUserId): BaseResponseDto<EmptyResponseDto> {
    return {
      code: 'SUCCESS',
      message: '로그인을 확인했습니다.',
      data: null,
    };
  }
}
