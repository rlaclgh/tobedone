import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { UpdateNoticeRequestDto } from '../../../src/shared/dtos/requests/update-notice.request.dto';
import { getAccessToken } from '../helpers/auth-helper';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accessToken = await getAccessToken(app, 'seed1@gmail.com', 'password');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user/notice (PATCH) can update notice interval and count', async () => {
    const NOTICE_INTERVAL = 10;
    const NOTICE_COUNT = 5;
    const payload: UpdateNoticeRequestDto = {
      noticeInterval: NOTICE_INTERVAL,
      noticeCount: NOTICE_COUNT,
    };
    const response = await request(app.getHttpServer())
      .patch('/user/notice')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.code).toBe('SUCCESS');
    expect(response.body.message).toBe('주기와 개수를 변경했습니다.');
    expect(response.body.data.noticeInterval).toBe(NOTICE_INTERVAL);
    expect(response.body.data.noticeCount).toBe(NOTICE_COUNT);
  });

  it('/user/notice (PATCH) can update only notice interval', async () => {
    const NOTICE_INTERVAL = 12;
    const payload: UpdateNoticeRequestDto = {
      noticeInterval: NOTICE_INTERVAL,
    };

    const response = await request(app.getHttpServer())
      .patch('/user/notice')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.code).toBe('SUCCESS');
    expect(response.body.message).toBe('주기와 개수를 변경했습니다.');
    expect(response.body.data.noticeInterval).toBe(NOTICE_INTERVAL);
  });

  it('/user/notice (PATCH) can update only notice count', async () => {
    const NOTICE_COUNT = 1;
    const payload: UpdateNoticeRequestDto = {
      noticeCount: NOTICE_COUNT,
    };

    const response = await request(app.getHttpServer())
      .patch('/user/notice')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.code).toBe('SUCCESS');
    expect(response.body.message).toBe('주기와 개수를 변경했습니다.');
    expect(response.body.data.noticeCount).toBe(NOTICE_COUNT);
  });
});
