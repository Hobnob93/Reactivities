import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from '../../features/nav/NavBar';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { ToastContainer } from 'react-toastify';
import NotFound from './NotFound';
import LoginForm from '../../features/activities/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';

const App: React.FC<RouteComponentProps> = ({location}) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, token, setAppLoaded]);

  if (!appLoaded) {
    return <LoadingComponent content="Loading app..." />
  }

  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <Route path="/" exact component={HomePage} />
      <Route path={"/(.+)"} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Switch>
              <Route path="/activities" exact component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route path={["/createActivity", "/manage/:id"]} key={location.key} component={ActivityForm} />
              <Route path="/login" component={LoginForm} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )} />
    </Fragment>
  );
}

export default withRouter(observer(App));
