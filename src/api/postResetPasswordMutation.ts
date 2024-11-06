import type { IResetForm } from "@pages/reset-password/types";
import { checkReponse } from "@utils/checkResponse";

export interface IPostResetPasswordMutationResponse {
  success: boolean;
  message: string;
}

export const postResetPasswordMutation = async (data: IResetForm) =>
  await fetch(`${process.env.BASE_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(checkReponse)
    .then((res: IPostResetPasswordMutationResponse) => res)
    .catch((err) => err);
