import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateNoticeRequestDto } from '../shared/dtos/requests/update-notice.request.dto';
import { UpdateUserNoticeCommand } from './cqrs/commands/update-user-notice.command';
import { User } from '@prisma/client';
import { UpdateNoticeResponseDto } from '../shared/dtos/responses/update-notice.response.dto';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async updateNotice(
    userId: string,
    updateNoticeRequestDto: UpdateNoticeRequestDto,
  ): Promise<BaseResponseDto<UpdateNoticeResponseDto>> {
    const { noticeInterval, noticeCount } = updateNoticeRequestDto;

    const updated = await this.commandBus.execute<
      UpdateUserNoticeCommand,
      User
    >(new UpdateUserNoticeCommand(userId, noticeInterval, noticeCount));

    return {
      code: 'SUCCESS',
      message: '주기와 개수를 변경했습니다.',
      data: {
        noticeCount: updated.noticeCount,
        noticeInterval: updated.noticeInterval,
      },
    };
  }
}
