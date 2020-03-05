import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';

export const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate, selectActivity, deleteActivity, submitting, loadingTarget} = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(a => 
                    <Item key={a.id}>
                        <Item.Content>
                            <Item.Header as="a">{a.title}</Item.Header>
                            <Item.Meta>{a.date}</Item.Meta>
                            <Item.Description>
                                <div>{a.description}</div>
                                <div>{a.city}, {a.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    onClick={() => selectActivity(a.id)}
                                    floated="right"
                                    content="View"
                                    color="blue"
                                />
                                <Button 
                                    name={a.id}
                                    loading={loadingTarget === a.id && submitting}
                                    onClick={(e) => deleteActivity(e, a.id)}
                                    floated="right"
                                    content="Delete"
                                    color="red"
                                />
                                <Label basic content={a.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList);

