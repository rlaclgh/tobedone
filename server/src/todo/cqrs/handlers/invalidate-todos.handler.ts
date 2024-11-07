import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InvalidateTodosCommand } from '../commands/invalidate-todos.command';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@CommandHandler(InvalidateTodosCommand)
export class InvalidateTodosHandler
  implements ICommandHandler<InvalidateTodosCommand>
{
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async execute(command: InvalidateTodosCommand): Promise<null> {
    const { userId } = command;
    await this.redis.del(`user:${userId}:todos`);
    return null;
  }
}
