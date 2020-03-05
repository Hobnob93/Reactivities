import React, { useEffect, Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import NavBar from '../../features/nav/NavBar';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore)

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." />

  return (
    <Fragment>
      <Route path="/" exact component={HomePage} />
      <Route path={"/(.+)"} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Route path="/activities" exact component={ActivityDashboard} />
            <Route path="/activities/:id" component={ActivityDetails} />
            <Route path={["/createActivity", "/manage/:id"]} key={location.key} component={ActivityForm} />
          </Container>
        </Fragment>
      )} />
    </Fragment>
  );
}

export default withRouter(observer(App));
