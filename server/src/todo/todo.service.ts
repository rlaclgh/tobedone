import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoRequestDto } from '../shared/dtos/requests/create-todo.request.dto';
import { CreateTodoCommand } from './cqrs/commands/create-todo.command';
import { Todo } from '@prisma/client';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';
import { CreateTodoResponseDto } from '../shared/dtos/responses/create-todo.response.dto';
import { GetTodosQuery } from './cqrs/queries/get-todos.query';
import { GetTodosResponseDto } from '../shared/dtos/responses/get-todos.response.dto';
import { GetUserByIdQuery } from '../shared/cqrs/queries/get-user-by-id.query';

@Injectable()
export class TodoService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  async getTodos(
    userId: string,
  ): Promise<BaseResponseDto<GetTodosResponseDto>> {
    const user = await this.queryBus.execute(new GetUserByIdQuery(userId));

    const todos = await this.queryBus.execute(
      new GetTodosQuery(userId, user.noticeCount, user.noticeInterval),
    );
    return {
      code: 'SUCCESS',
      message: '할일을 불러왔습니다.',
      data: todos,
    };
  }
}
