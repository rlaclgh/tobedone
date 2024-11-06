import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateaUserHandler } from './cqrs/handlers/create-user.handler';
import { GetUserByEmailHandler } from './cqrs/handlers/get-user-by-email.handler';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [CreateaUserHandler];
const QueryHandlers = [GetUserByEmailHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [AuthService, ...CommandHandlers, ...QueryHandlers],
})
export class AuthModule {}
