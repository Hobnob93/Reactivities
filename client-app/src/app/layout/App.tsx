import React, { useEffect, Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore'
import NavBar from '../../features/nav/NavBar';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App = () => {
  const activityStore = useContext(ActivityStore)

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." />

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Route path="/" exact component={HomePage} />
        <Route path="/activities" exact component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App);
