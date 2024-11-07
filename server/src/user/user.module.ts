import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateUserNoticeHandler } from './cqrs/handlers/update-user-notice.handler';
import { GetUserByIdHandler } from '../shared/cqrs/handlers/get-user-by-id.handler';

const CommandHandlers = [UpdateUserNoticeHandler];
const QueryHandlers = [GetUserByIdHandler];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...CommandHandlers, ...QueryHandlers],
})
export class UserModule {}
