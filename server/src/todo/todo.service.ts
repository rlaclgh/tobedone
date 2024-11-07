import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoRequestDto } from '../shared/dtos/requests/create-todo.request.dto';
import { CreateTodoCommand } from './cqrs/commands/create-todo.command';
import { Todo } from '@prisma/client';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';
import { CreateTodoResponseDto } from '../shared/dtos/responses/create-todo.response.dto';

@Injectable()
export class TodoService {
  constructor(private readonly commandBus: CommandBus) {}

  async createTodo(
    userId: string,
    createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<BaseResponseDto<CreateTodoResponseDto>> {
    const { title, link } = createTodoRequestDto;

    const todo = await this.commandBus.execute<CreateTodoCommand, Todo>(
      new CreateTodoCommand(userId, title, link),
    );

    return {
      code: 'SUCCESS',
      message: '할일을 생성했습니다.',
      data: todo,
    };
  }
}
