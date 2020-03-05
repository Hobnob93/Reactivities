import React, { SyntheticEvent, useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityStore from '../../../app/stores/activityStore'

interface IProps {
    submitting: boolean;
    target: string;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
    submitting,
    target,
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
                    <ActivityDetails />
                )}
                {editMode && (
                    <ActivityForm
                        key={(selectedActivity && selectedActivity.id) || 0}
                        activity={selectedActivity!}
                    />
                )}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
