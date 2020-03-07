import { RootStore } from "./rootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
    rootStore: RootStore;

    @observable token: string | null = window.localStorage.getItem("jwt");
    @observable appLoaded = false;

    constructor(rootStore: RootStore) {        
        this.rootStore = rootStore;

        reaction(() => this.token, token => {
            if (token) {
                window.localStorage.setItem("jwt", token);
            } else {
                window.localStorage.removeItem("jtw");
            }
        });
    }

    @action setToken = (token: string | null) => {
        window.localStorage.setItem("jwt", token!);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}
