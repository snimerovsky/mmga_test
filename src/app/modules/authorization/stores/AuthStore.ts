import { observable, runInAction, action, computed } from "mobx";
import { Api } from "../../../../api";
import { InstagramAccount, IPlan } from "../../../../api/interfaces";
import cookie from "js-cookie";

export class AuthStore {
  constructor(private api: Api) {}

  @observable
  private me: InstagramAccount | null | any = null;

  @observable
  private loggedIn: boolean = false;

  @observable
  public isModalPassword: boolean = false;

  @observable
  private profileFormFilled: boolean = false;

  public getMe(): InstagramAccount | null {
    return this.me;
  }

  public isLoggedIn() {
    return this.me !== null;
  }

  @computed get isOpenModalPassword() {
    return this.isModalPassword;
  }

  @action.bound
  public openModalPassword() {
    this.isModalPassword = true;
  }

  @action.bound
  public closeModalPassword() {
    this.isModalPassword = false;
  }

  public isProfileFormFilled() {
    const me = this.me;
    if (me === null) {
      return false;
    }

    return me.account_filled;
  }

  public fetchMyProfile = async () => {
    try {
      const r = await this.api.myProfile();
      runInAction(() => {
        if (r.data.id !== 0 && r.data.id !== undefined && r.data.id !== null) {
          // this.loggedIn = true;
          this.me = r.data;
          this.loggedIn = true;
        }
      });
      localStorage.setItem("token", "token");
    } catch (e) {
      if (e?.response?.status === 401) {
        runInAction(() => {
          // this.loggedIn = false;
        });
      }
    }
  };

  public logout = () => {
    runInAction(() => {
      this.loggedIn = false;
      this.me = null;
      cookie.remove("ssid2");
      this.api.logout();
    });
  };
}

export class FinanceStore {
  constructor(private api: Api) {}

  public plans: IPlan[] = [
    {
      id: 1,
      type: "Базовый",
      months: 1,
      guarantee: {
        status: false,
        description: "Неограниченный функционал",
        subscribers: null,
      },
      tokens: { amount: 100, price: 500 },
    },
    {
      id: 2,
      type: "Оптимальный",
      months: 3,
      guarantee: {
        status: true,
        subscribers: 50,
      },
      tokens: { amount: 280, price: 1400 },
    },
    {
      id: 3,
      type: "Продвинутый",
      months: 6,
      guarantee: {
        status: true,
        subscribers: 100,
      },
      tokens: { amount: 500, price: 2500 },
    },
    {
      id: 4,
      type: "Профессиональный",
      months: 12,
      guarantee: {
        status: true,
        subscribers: 300,
      },
      tokens: { amount: 900, price: 4500 },
    },
  ];

  @observable
  public currentPlan: IPlan | null = null;

  public setCurrentPlan = (plan: IPlan) => {
    runInAction(() => {
      this.currentPlan = plan;
    });
  };

  public clearCurrentPlan = () => {
    runInAction(() => {
      this.currentPlan = null;
    });
  };

  public setTokens = (n: number) => {
    runInAction(() => {
      if (this.currentPlan !== null) {
        console.log("set tokens called");
        this.currentPlan.tokens.amount = n;
        this.currentPlan.tokens.price = n * 5;
      }
    });
  };

  public pay = async (plan: IPlan) => {
    const rs = await this.api.pay({
      amount: plan.tokens.amount,
      price: plan.tokens.price,
      tariff_id: plan.id,
    });
    // eslint-disable-next-line no-restricted-globals
    location.href = rs.data.redirect_url;
  };
}
