import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: process.env.RERIS_URL,
      // url: 'redis://localhost:6379',
    }),
  ],
})
export class CacheModule {}
