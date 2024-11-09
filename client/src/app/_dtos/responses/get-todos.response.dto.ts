/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Todo {
    id: string;

    title: string;

    link: string;

    createdAt: string;
}

export interface GetTodosResponseDto {
    expireAt: string;

  todos: Todo[];
}
