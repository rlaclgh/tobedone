import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CreateTodoCommand } from '../commands/create-todo.command';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(private readonly prisma: PrismaService) {}

  execute(command: CreateTodoCommand): Promise<any> {
    const todoId = uuidv4();
    const { userId, title, link } = command;
    return this.prisma.todo.create({
      data: {
        id: todoId,
        userId: userId,
        title,
        link,
        createdAt: new Date(),
      },
    });
  }
}
