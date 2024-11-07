import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateNoticeRequestDto {
  @ApiProperty({
    description: 'todo 주기',
    type: 'number',
    required: false,
    nullable: false,
    example: 24,
  })
  @IsNumber(null, { message: '올바른 noticeInterval을 입력해주세요.' })
  @IsPositive({ message: '올바른 noticeInterval을 입력해주세요.' })
  noticeInterval?: number;

  @ApiProperty({
    description: 'todo 개수',
    type: 'number',
    required: false,
    nullable: false,
    example: 5,
  })
  @IsNumber(null, { message: '올바른 noticeCount을 입력해주세요.' })
  @IsPositive({ message: '올바른 noticeCount을 입력해주세요.' })
  noticeCount?: number;
}
