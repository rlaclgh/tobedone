import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/sign-up (POST) can create user', async () => {
    const payload = {
      email: 'test1@gmail.com',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(payload);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body.code).toBe('SUCCESS');
    expect(response.body.message).toBe('회원가입이 완료되었습니다.');
    expect(response.body.data).toBe(null);
  });

  it('/sign-up (POST) can not create duplicated user', async () => {
    const payload = {
      email: 'seed1@gmail.com',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(payload);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.code).toBe('FAIL');
    expect(response.body.message).toBe('이미 가입한 유저입니다.');
    expect(response.body.data).toBe(null);
  });

  it('/sign-in (POST) can login with valid email and password', async () => {
    const payload = {
      email: 'seed1@gmail.com',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(payload);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.code).toBe('SUCCESS');
    expect(response.body.message).toBe('로그인을 완료했습니다.');
    expect(response.body.data.accessToken).toBeDefined();
  });

  it('/sign-in (POST) can not login with valid email and wrong password', async () => {
    const payload = {
      email: 'seed1@gmail.com',
      password: 'wrong_password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(payload);

    expect(response.status).toBe(HttpStatus.FORBIDDEN);
    expect(response.body.code).toBe('FAIL');
    expect(response.body.message).toBe('로그인 정보를 확인해주세요.');
    expect(response.body.data).toBe(null);
  });

  it('/sign-in (POST) can not login with wrong email', async () => {
    const payload = {
      email: 'wrong_seed1@gmail.com',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(payload);

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.code).toBe('FAIL');
    expect(response.body.message).toBe('로그인 정보를 확인해주세요.');
    expect(response.body.data).toBe(null);
  });
});
