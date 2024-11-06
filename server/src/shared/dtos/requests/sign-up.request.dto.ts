import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({
    description: '이메일',
    type: 'string',
    nullable: false,
    example: 'rlaclgh@gmail.com',
  })
  @IsString({ message: '이메일 값을 확인해주세요.' })
  @IsEmail({}, { message: '이메일 값을 확인해주세요.' })
  email: string;

  @ApiProperty({
    description: '비밀번호',
    type: 'string',
    nullable: false,
    example: 'rlaclgh',
  })
  @IsString({ message: '비밀번호 값을 확인해주세요.' })
  password: string;
}
