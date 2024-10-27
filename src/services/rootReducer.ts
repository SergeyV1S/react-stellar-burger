import { combineSlices } from "@reduxjs/toolkit";

import { consructorSlice } from "./constructor";
import { ingredietSlice } from "./ingredient";
import { orderSlice } from "./order";
import { orderFeedSlice } from "./order-feed";
import { userSlice } from "./user";

export const rootReducer = combineSlices(ingredietSlice, consructorSlice, orderSlice, userSlice, orderFeedSlice);
