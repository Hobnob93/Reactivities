import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from '../../features/nav/NavBar';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({location}) => {
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
