import type { TRootState } from "@services/store";

export const findOrderData = (orderId: number) => (state: TRootState) => {
  let order = state.orderFeedSlice.ribbonData?.orders.find((orderFromRibbon) => orderFromRibbon.number === orderId);
  if (order) return order;

  order = state.profileOrderSlice.profileRibbonData?.orders.find(
    (orderFromRibbon) => orderFromRibbon.number === orderId
  );
  if (order) return order;

  return state.orderSlice.currentOrder;
};
