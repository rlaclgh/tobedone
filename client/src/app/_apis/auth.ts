import api from ".";
import { SignInRequestDto } from "../_dtos/requests/sign-in.request.dto";
import { SignUpRequestDto } from "../_dtos/requests/sign-up.request.dto";
import { BaseResponseDto } from "../_dtos/responses/base.response.dto";
import { SignInResponseDto } from "../_dtos/responses/sign-in.response.dto";
import { SignUpResponseDto } from "../_dtos/responses/sign-up.response.dto";

export const signUp = (
  data: SignUpRequestDto
): Promise<BaseResponseDto<SignUpResponseDto>> => {
  return api<BaseResponseDto<SignUpResponseDto>, SignUpRequestDto>(
    "/auth/sign-up",
    {
      method: "POST",
      data,
    }
  );
};

export const signIn = (
  data: SignInRequestDto
): Promise<BaseResponseDto<SignInResponseDto>> => {
  return api<BaseResponseDto<SignInResponseDto>, SignInRequestDto>(
    "/auth/sign-in",
    {
      method: "POST",
      data,
    }
  );
};
