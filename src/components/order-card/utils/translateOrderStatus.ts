import { EOrderStatus } from "@services/order-feed";

export const translateOrderStatus = (status: EOrderStatus) => {
  switch (status) {
    case EOrderStatus.done:
      return "Выполнен";
    case EOrderStatus.created:
      return "Создан";
    case EOrderStatus.pending:
      return "Готовится";
  }
};
