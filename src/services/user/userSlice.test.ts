import type { IUser } from "@interfaces/user";

import { getUserAction, loginUserAction, logoutUserAction, registerUserAction, updateUserAction } from "./action";
import { defaultUser, initialState, userSlice } from "./reducer";

const testUser: IUser = {
  email: "mail",
  name: "name"
};

describe("user slice", () => {
  it("inital state correctly", () => {
    const result = userSlice.reducer(undefined, { type: "" });

    expect(result).toEqual(initialState);
  });

  it("create user fulfilled", () => {
    const action = { type: registerUserAction.fulfilled.type, payload: testUser };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, user: testUser });
  });

  it("create user rejected", () => {
    const action = { type: registerUserAction.rejected.type, error: { message: "Error" } };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("create user pending", () => {
    const result = userSlice.reducer(initialState, { type: registerUserAction.pending.type });

    expect(result).toEqual({ ...initialState, isLoading: true });
  });

  it("get user fulfilled", () => {
    const action = { type: getUserAction.fulfilled.type, payload: testUser };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, user: testUser });
  });

  it("get user rejected", () => {
    const action = { type: getUserAction.rejected.type, error: { message: "Error" } };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("get user pending", () => {
    const result = userSlice.reducer(initialState, { type: getUserAction.pending.type });

    expect(result).toEqual({ ...initialState, isLoading: true });
  });

  it("login user fulfilled", () => {
    const action = { type: loginUserAction.fulfilled.type, payload: testUser };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, user: testUser });
  });

  it("login user rejected", () => {
    const action = { type: loginUserAction.rejected.type, error: { message: "Error" } };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("login user pending", () => {
    const result = userSlice.reducer(initialState, { type: loginUserAction.pending.type });

    expect(result).toEqual({ ...initialState, isLoading: true });
  });

  it("logout user fulfilled", () => {
    const result = userSlice.reducer(initialState, { type: logoutUserAction.fulfilled.type });

    expect(result).toEqual({ ...initialState, user: defaultUser });
  });

  it("logout user rejected", () => {
    const action = { type: logoutUserAction.rejected.type, error: { message: "Error" } };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("logout user pending", () => {
    const result = userSlice.reducer(initialState, { type: logoutUserAction.pending.type });

    expect(result).toEqual({ ...initialState, isLoading: true });
  });

  it("update user fulfilled", () => {
    const action = { type: updateUserAction.fulfilled.type, payload: { ...testUser, email: "mail2" } };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, user: { ...testUser, email: "mail2" } });
    expect(result).not.toEqual({ ...initialState, user: testUser });
  });

  it("update user rejected", () => {
    const action = { type: updateUserAction.rejected.type, error: { message: "Error" } };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("update user pending", () => {
    const result = userSlice.reducer(initialState, { type: updateUserAction.pending.type });

    expect(result).toEqual({ ...initialState, isLoading: true });
  });
});
