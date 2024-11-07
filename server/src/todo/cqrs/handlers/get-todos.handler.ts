import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from '../queries/get-todos.query';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(private prisma: PrismaService) {}

  execute(query: GetTodosQuery): Promise<any> {
    const { userId, noticeCount } = query;

    return this.prisma.todo.findMany({
      where: {
        userId,
      },
      take: noticeCount,
    });
  }
}
