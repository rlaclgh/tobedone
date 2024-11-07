import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoHandler } from './cqrs/handlers/create-todo.handler';

const CommandHandlers = [CreateTodoHandler];

@Module({
  imports: [CqrsModule],
  controllers: [TodoController],
  providers: [TodoService, ...CommandHandlers],
})
export class TodoModule {}
