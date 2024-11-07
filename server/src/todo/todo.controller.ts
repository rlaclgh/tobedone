import {
  Body,
  Controller,
  Get,
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
import { GetTodosResponseDto } from '../shared/dtos/responses/get-todos.response.dto';
import { EmptyResponseDto } from '../shared/dtos/responses/empty.response.dto';

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
    description: 'Todo 생성',
    message: '할일을 생성했습니다.',
  })
  createTodo(
    @Req() req: RequestWithUserId,
    @Body() createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<BaseResponseDto<CreateTodoResponseDto>> {
    return this.todoService.createTodo(req.userId, createTodoRequestDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Todo 를 불러오는 API',
    description: 'Todo 를 불러오는 API',
  })
  @SwaggerResponse(GetTodosResponseDto, {
    statusCode: HttpStatus.OK,
    description: 'Todo 리스트 불러오기',
    message: '할일을 불러왔습니다.',
  })
  getTodos(
    @Req() req: RequestWithUserId,
  ): Promise<BaseResponseDto<GetTodosResponseDto>> {
    return this.todoService.getTodos(req.userId);
  }

  @Post('/invalidate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Todo 의 cache를 삭제하는 API',
    description: 'Todo 의 cache를 삭제하는 API',
  })
  @ApiBearerAuth('authorization')
  @SwaggerResponse(EmptyResponseDto, {
    statusCode: HttpStatus.OK,
    description: 'Todo 의 cache를 삭제',
    message: 'Todo Cache를 삭제했습니다.',
  })
  invalidateTodos(
    @Req() req: RequestWithUserId,
  ): Promise<BaseResponseDto<EmptyResponseDto>> {
    return this.todoService.invalidateTodos(req.userId);
  }
}
