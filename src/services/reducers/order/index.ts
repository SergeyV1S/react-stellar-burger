import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, TOGGLE_ORDER_MODAL } from "@services/actions/order";

import type { IOrderInitialState, TOrderActions } from "./types";

const initialState: IOrderInitialState = {
  order: null,
  error: "",
  isOrderModalOpen: false,
  isLoading: false
};

export const orderReducer = (state = initialState, action: TOrderActions): IOrderInitialState => {
  switch (action.type) {
    case GET_ORDER: {
      return { ...state, isOrderModalOpen: true, order: null, error: "", isLoading: true };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, order: action.order, isLoading: false };
    }
    case GET_ORDER_FAILED: {
      return { ...state, error: action.error, isLoading: false };
    }
    case TOGGLE_ORDER_MODAL: {
      return { ...state, isOrderModalOpen: action.isOpen };
    }
    default: {
      return state;
    }
  }
};
