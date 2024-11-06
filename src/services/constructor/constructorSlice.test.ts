import { constructorSlice, initialState } from "./reducer";

describe("constructor clise", () => {
  it("initial state correctly", () => {
    const result = constructorSlice.reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });
});
