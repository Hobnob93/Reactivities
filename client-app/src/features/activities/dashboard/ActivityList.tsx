import React, { useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Item, Segment, Label } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityListItem from './ActivityListItem';

export const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate} = activityStore;

    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size="large" color="blue">
                        {group}
                    </Label>
                    <Segment clearing>
                        <Item.Group divided>
                            {activities.map(a => 
                                <ActivityListItem key={a.id} activity={a} />
                            )}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </Fragment>
    )
}

export default observer(ActivityList);

