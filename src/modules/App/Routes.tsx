import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Home = lazy(() => import('../Home/index'));
const Blogs = lazy(() => import('../Blogs/index'));
const UserCenter = lazy(() => import('../user/Center'));
const UserSettings = lazy(() => import('../user/Settings'));

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/blog" exact={true} component={Blogs} />
        <Route path="/user/center" exact={true} component={UserCenter} />
        <Route path="/user/setting" exact={true} component={UserSettings} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};
