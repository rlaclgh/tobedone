# 1. Node.js 이미지 선택
FROM node:20 AS builder

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. 패키지 파일 복사
COPY package.json package-lock.json ./

# 4. 의존성 설치
RUN npm install

# 5. Prisma 관련 파일 복사
COPY prisma ./prisma

# 6. Prisma 클라이언트 생성
RUN npm run generate

# 7. 애플리케이션 소스 코드 복사
COPY . .

# 8. 애플리케이션 빌드
RUN npm run build

# 9. 실행을 위한 런타임 이미지 선택
FROM node:20 AS runner

# 10. 작업 디렉토리 생성
WORKDIR /app

# 11. 빌드된 파일 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# 13. 환경 변수 설정 (필요하면 수정)
ENV NODE_ENV=production

# 14. 애플리케이션 실행
CMD ["node", "dist/src/main.js"]

# 15. 컨테이너 포트 설정 (예: 5000 포트 노출)
EXPOSE 5000