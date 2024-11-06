import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { User } from '@prisma/client';

@CommandHandler(CreateUserCommand)
export class CreateaUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private prisma: PrismaService) {}

  execute(command: CreateUserCommand): Promise<User> {
    const { userId, email, password } = command;
    return this.prisma.user.create({
      data: {
        id: userId,
        email,
        password,
        noticeInterval: 24,
        noticeCount: 5,
        createdAt: new Date(),
      },
    });
  }
}
