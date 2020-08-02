import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Home = lazy(() => import("./modules/Home/index"));
const Blogs = lazy(() => import("./modules/Blogs/index"));

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/blog" exact={true} component={Blogs} />
      </Switch>
    </Suspense>
  );
};
