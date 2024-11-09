import { promises as fs } from "fs";
import path from "path";

const requestDirectoryPath = path.join(
  __dirname,
  "../server/src/shared/dtos/requests"
);

const responseDirectoryPath = path.join(
  __dirname,
  "../server/src/shared/dtos/responses"
);
const requestOutputPath = path.join(
  __dirname,
  "../client/src/app/_dtos/requests"
);
const responseOutputPath = path.join(
  __dirname,
  "../client/src/app/_dtos/responses"
);

const convertDtoToInterface = async (
  filePath: string,
  outputPath: string
): Promise<void> => {
  try {
    const data = await fs.readFile(filePath, "utf8");

    // 정규 표현식을 사용하여 변환
    const comment =
      "/* eslint-disable @typescript-eslint/no-empty-object-type */\n";
    const result = data
      .replace(/import {.*? } from 'class-validator';\s*/g, "") // class-validator 관련 import 제거
      .replace(/export class/g, `export interface`) // class -> interface
      .replace(/import { ApiProperty } from '@nestjs\/swagger';\s*/g, "")
      .replace(/@ApiProperty\([\s\S]*?\)\n\s*/g, "")
      .replace(/@\w+\((?:[^()]*|\((?:[^()]*|\([^()]*\))*\))*\)\s*\n/g, ""); // 모든 데코레이터 제거

    await fs.writeFile(outputPath, comment + result, "utf8");
    console.log(`${outputPath} 가 인터페이스로 변환되었습니다.`);
  } catch (err) {
    console.error("파일 처리 중 오류 발생:", err);
  }
};

/**
 * backend에서 사용하는 http request, response class 를 client에서 사용할 수 있게 interface로 전환 시키는 함수입니다.
 */

const main = async (): Promise<void> => {
  try {
    // requests
    const requestFiles = await fs.readdir(requestDirectoryPath);
    const tsRequestFiles = requestFiles.filter((file) =>
      file.endsWith("dto.ts")
    );
    for (const file of tsRequestFiles) {
      const filePath = path.join(requestDirectoryPath, file);
      await convertDtoToInterface(filePath, path.join(requestOutputPath, file));
    }

    // responses
    const responseFiles = await fs.readdir(responseDirectoryPath);
    const tsResponseFiles = responseFiles.filter((file) =>
      file.endsWith("dto.ts")
    );
    for (const file of tsResponseFiles) {
      const filePath = path.join(responseDirectoryPath, file);
      await convertDtoToInterface(
        filePath,
        path.join(responseOutputPath, file)
      );
    }
  } catch (err) {
    console.error("디렉토리 읽기 실패:", err);
  }
};

main();
