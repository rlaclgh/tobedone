import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from '../queries/get-todos.query';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  GetTodosResponseDto,
  Todo,
} from '../../../shared/dtos/responses/get-todos.response.dto';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async execute(query: GetTodosQuery): Promise<GetTodosResponseDto> {
    const { userId, noticeCount, noticeInterval } = query;

    const cached: string = await this.redis.get(`user:${userId}:todos`);

    if (cached) {
      const parsed: GetTodosResponseDto = JSON.parse(cached);
      return parsed;
    }

    const todos: Todo[] = await this.prisma.$queryRaw`
      SELECT 
        *
      FROM
        todo t
      WHERE
        t.user_id = CAST(${userId} AS uuid)
      ORDER BY RANDOM()
      LIMIT ${noticeCount}
    `;

    const now = new Date();
    const ttl = noticeInterval * 60 * 60;
    const expireAt = new Date(now.getTime() + ttl * 1000).toISOString();
    const result = {
      expireAt,
      todos,
    };

    await this.redis.set(
      `user:${userId}:todos`,
      JSON.stringify(result),
      'EX',
      ttl,
    );

    return result;
  }
}
