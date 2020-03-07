import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Label, Header } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IUserFormValues } from '../../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
    email: isRequired("Email"),
    password: isRequired("Password")
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;

    return (
        <FinalForm 
            onSubmit={(values: IUserFormValues) => login(values)
                .catch(error => ({ [FORM_ERROR]: error }))}
            validate={validate} 
            render={({handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center" />
                    <Field
                        name="email"
                        placeholder="Email"
                        component={TextInput}
                    />
                    <Field
                        name="password"
                        placeholder="Password"
                        type="password"
                        component={TextInput}
                    />
                    {submitError && !dirtySinceLastSubmit && (
                        <Label color="red" basic content={submitError.statusText} />
                    )}
                    <Button
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        fluid
                        color="teal"
                        content="Login"
                    />
                </Form>
            )} />
    )
}

export default LoginForm
