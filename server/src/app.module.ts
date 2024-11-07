import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { CacheModule } from './shared/cache/cache.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, TodoModule, CacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
