import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { AuthGuard, RequestWithUserId } from '../shared/guards/auth.guard';
import { CreateTodoRequestDto } from '../shared/dtos/requests/create-todo.request.dto';
import { BaseResponseDto } from '../shared/dtos/responses/base.response.dto';
import { CreateTodoResponseDto } from '../shared/dtos/responses/create-todo.response.dto';
import { SwaggerResponse } from '../shared/decorators/swagger-response';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Todo 를 생성하는 API',
    description: 'Todo 를 생성하는 API',
  })
  @ApiBearerAuth('authorization')
  @SwaggerResponse(CreateTodoResponseDto, {
    statusCode: HttpStatus.CREATED,
    description: 'Todo 생성완료',
    message: '할일을 생성했습니다.',
  })
  createTodo(
    @Req() req: RequestWithUserId,
    @Body() createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<BaseResponseDto<CreateTodoResponseDto>> {
    return this.todoService.createTodo(req.userId, createTodoRequestDto);
  }
}
