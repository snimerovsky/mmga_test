import { api } from "../api";
import {AuthStore, FinanceStore} from "./modules/authorization/stores/AuthStore";

export interface IStore {
  authStore: AuthStore;
  financeStore: FinanceStore;
}

export const store: IStore = {
  authStore: new AuthStore(api),
  financeStore: new FinanceStore(api),
};
