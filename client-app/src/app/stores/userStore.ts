import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from '../..';

export default class UserStore {
    rootStore: RootStore;
    @observable user: IUser | null = null;


    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @computed get isLoggedIn() { return !!this.user }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction("<try> Log in", () => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push("/activities");
        } catch (error) {
            throw error;
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push("/");
    }

    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction("<try> Get user", () => {
                this.user = user;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.register(values);
            runInAction("<try> Register", () => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push("/activities");
        } catch (error) {
            throw error;
        }
    }
}
