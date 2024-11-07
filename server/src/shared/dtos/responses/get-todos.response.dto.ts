import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Todo {
  @ApiProperty({
    description: 'ID',
    type: 'string',
    nullable: false,
    example: 'uuid',
  })
  @IsString({ message: 'id 값을 확인해주세요.' })
  id: string;

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

  @ApiProperty({
    description: '생성 시간',
    type: 'string',
    nullable: false,
    example: 'https://google.com',
  })
  @IsString({ message: '생성 시간을 확인해주세요.' })
  createdAt: string;
}

export class GetTodosResponseDto {
  @ApiProperty({
    description: '만료일',
    type: 'string',
    nullable: false,
    example: '2024-11-08T11:33:16.745Z',
  })
  @IsString({ message: '만료일 값을 확인해주세요.' })
  expireAt: string;

  todos: Todo[];
}
