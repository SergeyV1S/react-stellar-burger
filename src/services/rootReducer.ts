import { combineSlices } from "@reduxjs/toolkit";

import { constructorSlice } from "./constructor";
import { ingredietSlice } from "./ingredient";
import { orderSlice } from "./order";
import { orderFeedSlice } from "./order-feed";
import { profileOrderSlice } from "./profile-order";
import { userSlice } from "./user";

export const rootReducer = combineSlices(
  ingredietSlice,
  constructorSlice,
  orderSlice,
  userSlice,
  orderFeedSlice,
  profileOrderSlice
);
