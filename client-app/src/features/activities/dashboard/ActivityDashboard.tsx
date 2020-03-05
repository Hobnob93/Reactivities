import React, { SyntheticEvent, useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityStore from '../../../app/stores/activityStore'

interface IProps {
    selectActivity: (id: string) => void;
    submitting: boolean;
    target: string;
    setEditMode: (editMode: boolean) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
    selectActivity,
    submitting,
    target,
    setEditMode,
    editActivity,
    deleteActivity
}) => {
    const activityStore = useContext(ActivityStore);
    const {editMode, selectedActivity} = activityStore;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (
                    <ActivityDetails 
                        setEditMode={setEditMode}
                        selectActivity={selectActivity} 
                    />
                )}
                {editMode && (
                    <ActivityForm
                        key={(selectedActivity && selectedActivity.id) || 0}
                        setEditMode={setEditMode}
                        activity={selectedActivity!}
                        editActivity={editActivity}
                        submitting={submitting}
                    />
                )}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
