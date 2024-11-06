import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '../queries/get-user-by-email.query';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { User } from '@prisma/client';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private prisma: PrismaService) {}

  execute(query: GetUserByEmailQuery): Promise<User | null> {
    const { email } = query;
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
