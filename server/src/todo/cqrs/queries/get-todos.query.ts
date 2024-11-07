export class GetTodosQuery {
  constructor(
    public readonly userId: string,
    public readonly noticeCount: number,
  ) {}
}
