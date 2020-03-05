import { observable, action } from 'mobx'
import { createContext } from 'react'
import { IActivity } from '../models/activity';
import agent from '../api/agent';

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;

    @action loadActivities = () => {
        this.loadingInitial = true;
        agent.Activities.list()
            .then(activities => {
                activities.forEach(a => {
                    a.date = a.date.split(".")[0];
                    this.activities.push(a);
                });
            }).finally(() => this.loadingInitial = false);
    };
}

export default createContext(new ActivityStore());