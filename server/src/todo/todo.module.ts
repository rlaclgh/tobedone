import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoHandler } from './cqrs/handlers/create-todo.handler';
import { GetTodosHandler } from './cqrs/handlers/get-todos.handler';
import { GetUserByIdHandler } from '../shared/cqrs/handlers/get-user-by-id.handler';
import { InvalidateTodosHandler } from './cqrs/handlers/invalidate-todos.handler';

const CommandHandlers = [CreateTodoHandler, InvalidateTodosHandler];
const QueryHandlers = [GetTodosHandler, GetUserByIdHandler];
@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [TodoService, ...CommandHandlers, ...QueryHandlers],
})
export class TodoModule {}
