import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { getAccessToken } from '../helpers/auth-helper';
import { CreateTodoRequestDto } from '../../../src/shared/dtos/requests/create-todo.request.dto';
import * as request from 'supertest';
import { USER_EMAIL2, USER_PASSWORD2 } from '../../../prisma/constants';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accessToken = await getAccessToken(app, USER_EMAIL2, USER_PASSWORD2);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/todo (POST) can create todo', async () => {
    const TITLE = '제목';
    const LINK = 'https://google.com';

    const payload: CreateTodoRequestDto = {
      title: TITLE,
      link: LINK,
    };

    const response = await request(app.getHttpServer())
      .post('/todo')
      .send(payload)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body.code).toBe('SUCCESS');
    expect(response.body.message).toBe('할일을 생성했습니다.');
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.title).toBe(TITLE);
    expect(response.body.data.link).toBe(LINK);
    expect(response.body.data.createdAt).toBeDefined();
  });

  it('/todo (GET) can get todos', async () => {
    const response = await request(app.getHttpServer())
      .get('/todo')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.code).toBe('SUCCESS');
    expect(response.body.message).toBe('할일을 불러왔습니다.');
    expect(response.body.data.expireAt).toBeDefined();
    expect(response.body.data.todos.length).toBe(5);
  });

  it('/todo (GET) can get cached todos', async () => {
    const response = await request(app.getHttpServer())
      .get('/todo')
      .set('Authorization', `Bearer ${accessToken}`);

    const response2 = await request(app.getHttpServer())
      .get('/todo')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.body.data.expireAt).toBe(response2.body.data.expireAt);
  });

  it('/todo/invalidate (POST) can invalidate todos', async () => {
    // 1. get todos 호출
    const getResponse = await request(app.getHttpServer())
      .get('/todo')
      .set('Authorization', `Bearer ${accessToken}`);

    // 2. invalidate todos 호출
    const invalidateResponse = await request(app.getHttpServer())
      .post('/todo/invalidate')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(invalidateResponse.status).toBe(HttpStatus.OK);
    expect(invalidateResponse.body.code).toBe('SUCCESS');
    expect(invalidateResponse.body.message).toBe('Todo Cache를 삭제했습니다.');
    expect(invalidateResponse.body.data).toBe(null);

    // 3. get todos 다시 호출
    const getResponse2 = await request(app.getHttpServer())
      .get('/todo')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(getResponse.body.data.expireAt).not.toBe(
      getResponse2.body.data.expireAt,
    );
  });
});
