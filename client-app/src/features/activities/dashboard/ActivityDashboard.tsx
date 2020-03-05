import React from 'react'
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'

export const ActivityDashboard: React.FC = () => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
