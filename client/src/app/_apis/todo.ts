import api from ".";
import { CreateTodoRequestDto } from "../_dtos/requests/create-todo.request.dto";
import { BaseResponseDto } from "../_dtos/responses/base.response.dto";
import { CreateTodoResponseDto } from "../_dtos/responses/create-todo.response.dto";

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
