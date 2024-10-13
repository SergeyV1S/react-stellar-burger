export interface IOrderInitialState {
  order: IOrder | null
  error: string | undefined
  isOrderModalOpen: boolean
  isLoading: boolean
}

export interface IOrder {
  name: string
  order: {
    number: number
  }
}
