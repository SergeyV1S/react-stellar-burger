import type { IUser } from "@interfaces/user"

export interface IUserInitialState {
  user: IUser
  isLoading: boolean
  error: string | undefined
}
