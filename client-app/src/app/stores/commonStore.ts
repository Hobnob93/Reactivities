import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class CommonStore {
    rootStore: RootStore;

    @observable token: string | null = null;
    @observable appLoaded = false;

    constructor(rootStore: RootStore) {        
        this.rootStore = rootStore;
    }

    @action setToken = (token: string | null) => {
        window.localStorage.setItem("jwt", token!);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}
