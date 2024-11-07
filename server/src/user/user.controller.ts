import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateNoticeRequestDto } from '../shared/dtos/requests/update-notice.request.dto';
import { UpdateNoticeResponseDto } from '../shared/dtos/responses/update-notice.response.dto';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';
import { AuthGuard, RequestWithUserId } from '../shared/guards/auth.guard';
import { SwaggerResponse } from '../shared/decorators/swagger-response';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/notice')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '주기와 개수를 변경하는 API',
    description: '주기와 개수를 변경하는 API',
  })
  @SwaggerResponse(UpdateNoticeResponseDto, {
    statusCode: HttpStatus.OK,
    description: '주기와 개수 변경 완료',
    message: '주기와 개수를 변경했습니다.',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  updateNotice(
    @Req() req: RequestWithUserId,
    @Body() updateNoticeRequestDto: UpdateNoticeRequestDto,
  ): Promise<BaseResponseDto<UpdateNoticeResponseDto>> {
    return this.userService.updateNotice(req.userId, updateNoticeRequestDto);
  }
}
