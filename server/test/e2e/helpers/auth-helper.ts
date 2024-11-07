import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const getAccessToken = async (
  app: INestApplication,
  email: string,
  password: string,
): Promise<string> => {
  const response = await request(app.getHttpServer())
    .post('/auth/sign-in') // 경로를 앱에 맞게 설정
    .send({
      email,
      password,
    });

  return response.body.data.accessToken;
};
