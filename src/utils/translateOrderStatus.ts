import { EOrderStatus } from "@interfaces/order";

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
