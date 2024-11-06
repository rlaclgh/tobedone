import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInResponseDto {
  @ApiProperty({
    description: 'access token',
    type: 'string',
    nullable: false,
    example: 'JWT Token',
  })
  @IsString()
  accessToken: string;
}
