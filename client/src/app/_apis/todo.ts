import api from ".";
import { CreateTodoRequestDto } from "../_dtos/requests/create-todo.request.dto";
import { BaseResponseDto } from "../_dtos/responses/base.response.dto";
import { CreateTodoResponseDto } from "../_dtos/responses/create-todo.response.dto";
import { GetTodosResponseDto } from "../_dtos/responses/get-todos.response.dto";

export const createTodo = (
  data: CreateTodoRequestDto
): Promise<BaseResponseDto<CreateTodoResponseDto>> => {
  return api<BaseResponseDto<CreateTodoResponseDto>, CreateTodoRequestDto>(
    "/todo",
    {
      method: "POST",
      data,
    }
  );
};

export const getTodos = (): Promise<BaseResponseDto<GetTodosResponseDto>> => {
  return api<BaseResponseDto<GetTodosResponseDto>, null>("/todo", {
    method: "GET",
  });
};

export const invalidateTodo = (): Promise<BaseResponseDto<undefined>> => {
  return api("/todo/invalidate", {
    method: "POST",
    cache: "no-store",
  });
};
