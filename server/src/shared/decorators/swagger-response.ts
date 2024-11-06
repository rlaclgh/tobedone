import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { EmptyResponseDto } from '../dtos/responses/empty.response.dto';
import { BaseResponseDto } from '../dtos/responses/base.response.dto';

type Options = {
  statusCode: HttpStatus;
  description?: string;
  message?: string;
};

export const SwaggerResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  options: Options,
) => {
  const isEmptyDto = dataDto === EmptyResponseDto;

  const { statusCode, description, message } = options;

  const messageProperty = message
    ? {
        message: {
          type: 'string',
          nulllable: false,
          example: message,
        },
      }
    : null;

  const isSuccess = statusCode >= 200 && statusCode < 300;

  return applyDecorators(
    ApiExtraModels(BaseResponseDto, dataDto),
    ApiResponse({
      status: statusCode,
      description: description,
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(BaseResponseDto),
          },
          {
            properties: {
              code: {
                type: 'string',
                nullable: false,
                example: isSuccess ? 'SUCCESS' : 'FAIL',
              },
              ...messageProperty,
            },
          },
          {
            properties: {
              data: isEmptyDto
                ? { type: 'null', nullable: true, example: 'null' } // 빈 DTO일 경우 null로 설정
                : { $ref: getSchemaPath(dataDto) }, // 아닌 경우 해당 DTO 타입
            },
          },
        ],
      },
    }),
  );
};
