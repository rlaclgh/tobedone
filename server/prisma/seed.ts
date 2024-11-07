import { PrismaClient, User } from '@prisma/client';

/** uuids
6cd6a91e-a9f0-472a-a60f-80a7dc91aec2
77a91e87-ce36-47d8-99b5-e07d5657b9ba
67e25a74-4420-4728-80a4-5cfea5cd41ee
3e64c97d-cfb4-4ef5-a60d-62174f14634b
68ddfea9-73e7-43db-aa8c-bf8485d034a0
1826c0f1-64bf-43e1-b8fd-d8c125d2972d
22daac6d-a476-42b5-863d-3e8a5b9fa10c
65342593-1c00-42d9-a5e6-bcdc8828111d
 */

const prisma = new PrismaClient();

const USER_SEEDS: User[] = [
  {
    id: '6cd6a91e-a9f0-472a-a60f-80a7dc91aec2',
    email: 'seed1@gmail.com',
    // "password" 란 문자
    password: '$2b$10$PFEJJsZntPHbTu7/c9rkve4c97Capv5nO2wqDVoycFTdMvgymCCHe',
    noticeInterval: 24,
    noticeCount: 5,
    createdAt: new Date(),
  },
];

async function main() {
  // 초기 데이터 삽입
  await prisma.user.createMany({
    data: USER_SEEDS,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });