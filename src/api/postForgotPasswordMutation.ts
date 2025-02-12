import { checkReponse } from "@utils/index";

export interface IPostForgutPasswordMutationResponse {
  success: boolean;
  message: string;
}

export const postForgotPasswordMutation = (data: { email: string }) =>
  fetch(`${process.env.BASE_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(checkReponse)
    .then((res: IPostForgutPasswordMutationResponse) => res)
    .catch((err) => err);
