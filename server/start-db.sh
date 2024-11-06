# 개발 환경에서 postgresql DB를 실행하는 스크립트입니다.
docker run -e POSTGRES_PASSWORD=password -e POSTGRES_USER=username -e POSTGRES_DB=tobedone_dev -d -p 5431:5432 postgres:latest