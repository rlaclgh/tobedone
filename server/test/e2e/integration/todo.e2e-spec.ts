import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { getAccessToken } from '../helpers/auth-helper';
import { CreateTodoRequestDto } from '../../../src/shared/dtos/requests/create-todo.request.dto';
import * as request from 'supertest';

describe('TodoController (e2e)', () => {
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
});
