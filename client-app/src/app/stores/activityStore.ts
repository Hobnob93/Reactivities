import { observable, action, computed, configure, runInAction } from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({ enforceActions: "always" });

export class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable loadingTarget = "";

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    };

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.split("T")[0];
            activities[date] = activities[date]
                ? [...activities[date], activity]
                : [activity]
            return activities;
        }, {} as {[key: string]: IActivity[]}));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction("<try> Loading activities", () => {
                activities.forEach(a => {
                    a.date = a.date.split(".")[0];
                    this.activityRegistry.set(a.id, a);
                });
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction("<finally> Loading activities", () => {
                this.loadingInitial = false;
            });
        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction("<try> Creating an activity", () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction("<finally> creating an activity", () => {
                this.submitting = false;
            });
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction("<try> Edit activity", () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction("<finally> Edit activity", () => {
                this.submitting = false;
            });
        }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.loadingTarget = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction("<try> Delete activity", () => {
                this.activityRegistry.delete(id);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction("<finally> Delete activity", () => {
                this.submitting = false;
                this.loadingTarget = "";
            });
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction("<try> Load activity", () => {
                    this.activity = activity;
                });
            } catch (error) {
                console.log(error);
            } finally {
                runInAction("<finally> Load activity", () => {
                    this.loadingInitial = false;
                });
            }
        }
    };

    @action clearActivity = () => {
        this.activity = null;
    };

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    };
}

export default createContext(new ActivityStore());