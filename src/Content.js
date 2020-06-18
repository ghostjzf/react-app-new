import React from "react";
import { Switch, Route } from "react-router-dom";
import Blog from "./Blog";
import Resume from "./Resume";

export default () => {
  return (
    <div>
      <Switch>
        <Route path="/blog" exact={true} component={Blog} />
        <Route path="/resume" exact={true} component={Resume} />
      </Switch>
    </div>
  );
};
