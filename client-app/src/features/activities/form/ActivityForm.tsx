import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivityFormValues } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/form/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';

interface IDetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IDetailParams>> = ({
    match,
    history
}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, activity: initialState, loadActivity, clearActivity} = activityStore;

    const [activity, setActivity] = useState<IActivityFormValues>({
        id: undefined,
        title: '',
        category: '',
        description: '',
        date: undefined,
        time: undefined,
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id) {
            loadActivity(match.params.id)
                .then(() => {
                    initialState && setActivity(initialState)
                });
        }

        return () => {
            clearActivity();
        };
    }, [match.params.id, loadActivity, clearActivity, initialState, activity.id]);

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;
        console.log(activity);
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm onSubmit={handleFinalFormSubmit} render={({handleSubmit}) => (
                        <Form onSubmit={handleSubmit}>
                            <Field name="title" placeholder="Title" value={activity.title} component={TextInput} />
                            <Field name="description" placeholder="Description" value={activity.description} component={TextAreaInput} rows={3} />
                            <Field name="category" placeholder="Category" value={activity.category} component={SelectInput} options={category} />
                            <Form.Group widths="equal">
                                <Field name="date" placeholder="Date" value={activity.date} component={DateInput} date={true} />
                                <Field name="time" placeholder="Time" value={activity.time} component={DateInput} time={true} />
                            </Form.Group>
                            <Field name="city" placeholder="City" value={activity.city} component={TextInput} />
                            <Field name="venue" placeholder="Venue" value={activity.venue} component={TextInput} />
                            <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
                            <Button floated="right" type="button" content="Cancel" onClick={() => history.push("/activities")} />
                        </Form>
                    )} />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);
