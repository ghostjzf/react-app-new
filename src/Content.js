import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Blog = lazy(() => import("./Blog"));
const Resume = lazy(() => import("./Resume"));

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/blog" exact={true} component={Blog} />
        <Route path="/resume" exact={true} component={Resume} />
      </Switch>
    </Suspense>
  );
};
