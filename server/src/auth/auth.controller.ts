import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from '../shared/dtos/requests/sign-up.request.dto';
import { SwaggerResponse } from '../shared/decorators/swagger-response';
import { SignUpResponseDto } from '../shared/dtos/responses/sign-up.response.dto';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
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
}
