import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseResponseDto<T> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    enum: ['SUCCESS', 'FAIL'],
    description: '성공 혹은 실패',
    example: 'SUCCESS',
  })
  code: 'SUCCESS' | 'FAIL';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '메시지 입니다.',
    example: '메시지 입니다.',
  })
  message: string;

  @IsOptional()
  @ApiProperty({
    type: Object,
  })
  data?: T;
}
