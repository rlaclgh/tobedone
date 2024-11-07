import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoRequestDto {
  @ApiProperty({
    description: '제목',
    type: 'string',
    nullable: false,
    example: '제목',
  })
  @IsString({ message: '제목 값을 확인해주세요.' })
  title: string;

  @ApiProperty({
    description: '링크',
    type: 'string',
    nullable: false,
    example: 'https://google.com',
  })
  @IsString({ message: '링크 값을 확인해주세요.' })
  link: string;
}
