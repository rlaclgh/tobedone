export class CreateTodoCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly link: string,
  ) {}
}
