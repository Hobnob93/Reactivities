import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { ActivityFormValues } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/form/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired("Title"),
    category: isRequired("Category"),
    description: composeValidators(
        isRequired("Description"),
        hasLengthGreaterThan(4)({message: "Description needs to be at least 5 characters"}))(),
    city: isRequired("City"),
    venue: isRequired("Venue"),
    date: isRequired("Date"),
    time: isRequired("Time"),
});

interface IDetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IDetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const {submitting, loadActivity, createActivity, editActivity} = rootStore.activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id)
                .then((activity) => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [match.params.id, loadActivity]);

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;
        
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        initialValues={activity}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form loading={loading} onSubmit={handleSubmit}>
                                <Field 
                                    name="title" 
                                    placeholder="Title" 
                                    value={activity.title} 
                                    component={TextInput}
                                />
                                <Field 
                                    name="description" 
                                    placeholder="Description"
                                    value={activity.description} 
                                    component={TextAreaInput} 
                                    rows={3} 
                                />
                                <Field 
                                    name="category" 
                                    placeholder="Category" 
                                    value={activity.category} 
                                    component={SelectInput} 
                                    options={category}
                                />
                                <Form.Group widths="equal">
                                    <Field 
                                        name="date" 
                                        placeholder="Date" 
                                        value={activity.date} 
                                        component={DateInput} 
                                        date={true}
                                    />
                                    <Field 
                                        name="time"
                                        placeholder="Time"
                                        value={activity.time}
                                        component={DateInput}
                                        time={true}
                                    />
                                </Form.Group>
                                <Field 
                                    name="city"
                                    placeholder="City"
                                    value={activity.city}
                                    component={TextInput}
                                />
                                <Field
                                    name="venue"
                                    placeholder="Venue"
                                    value={activity.venue}
                                    component={TextInput}
                                />
                                <Button
                                    loading={submitting}
                                    disabled={loading || invalid || pristine}
                                    floated="right"
                                    positive
                                    type="submit"
                                    content="Submit"
                                />
                                <Button
                                    disabled={loading}
                                    floated="right"
                                    type="button"
                                    content="Cancel"
                                    onClick={() => history.push(`/activities${activity.id ? `/${activity.id}` : ""}`)}
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);
