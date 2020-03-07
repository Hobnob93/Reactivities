import { RootStore } from './rootStore';
import { observable, action } from 'mobx';

export default class ModalStore {
    rootStore: RootStore;

    @observable.shallow modal = {
        open: false,
        body: null
    }

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action openModal = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}
