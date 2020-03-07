import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IUserFormValues } from '../../../app/models/user';

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;

    return (
        <FinalForm 
            onSubmit={(values: IUserFormValues) => login(values)} 
            render={({handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
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
                    <Button positive content="Login" />
                </Form>
            )} />
    )
}

export default LoginForm
