export class UpdateUserNoticeCommand {
  constructor(
    public readonly userId: string,
    public readonly noticeInterval?: number,
    public readonly noticeCount?: number,
  ) {}
}
