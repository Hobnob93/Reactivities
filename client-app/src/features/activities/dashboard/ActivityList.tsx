import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
}

export const ActivityList: React.FC<IProps> = ({activities, selectActivity}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(a => 
                    <Item key={a.id}>
                        <Item.Content>
                            <Item.Header as="a">{a.title}</Item.Header>
                            <Item.Meta>{a.date}</Item.Meta>
                            <Item.Description>
                                <div>{a.description}</div>
                                <div>{a.city}, {a.vanue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(a.id)} floated="right" content="View" color="blue" />
                                <Label basic content={a.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList

