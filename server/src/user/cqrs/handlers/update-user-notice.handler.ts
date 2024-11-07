import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserNoticeCommand } from '../commands/update-user-notice.command';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@CommandHandler(UpdateUserNoticeCommand)
export class UpdateUserNoticeHandler
  implements ICommandHandler<UpdateUserNoticeCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  execute(command: UpdateUserNoticeCommand): Promise<any> {
    const { userId, noticeInterval, noticeCount } = command;

    const updates = {};

    if (noticeInterval != null) updates['noticeInterval'] = noticeInterval;
    if (noticeCount != null) updates['noticeCount'] = noticeCount;

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updates,
    });
  }
}
