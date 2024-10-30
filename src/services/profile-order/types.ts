import type { EWsStatuses, IFeedRibbonDataResponse } from "../order-feed";

export interface IProfileRibbonInitialState {
  profileRibbonData: IFeedRibbonDataResponse | null;
  error: string | null;
  profileRibbonWsStatus: EWsStatuses;
}
