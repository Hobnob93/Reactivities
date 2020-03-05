import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface IDetailParams {
    id: string;
};

const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({
    match
}) => {
    const activityStore = useContext(ActivityStore);
    const {activity, openEditForm, cancelSelectedActivity, loadActivity, loadingInitial} = activityStore;
    
    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match]);

    if (loadingInitial || !activity) return <LoadingComponent content="Loading activity..." />

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>{activity!.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width={2}>
                    <Button basic color="blue" content="Edit" onClick={() => openEditForm(activity!.id)} />
                    <Button basic color="grey" content="Cancel" onClick={() => cancelSelectedActivity()} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails);
