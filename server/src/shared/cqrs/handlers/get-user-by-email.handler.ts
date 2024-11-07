import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { User } from '@prisma/client';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private prisma: PrismaService) {}

  execute(query: GetUserByIdQuery): Promise<User | null> {
    const { userId } = query;
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
