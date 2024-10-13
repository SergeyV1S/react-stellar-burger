import type { IUser } from "@interfaces/user"

export interface ILoginSuccessful {
  success: boolean
  accessToken: string
  refreshToken: string
  user: IUser
}
