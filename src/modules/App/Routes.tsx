import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Home = lazy(() => import('../Home/index'));
const Blogs = lazy(() => import('../Blogs/index'));

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/blog" exact={true} component={Blogs} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};
