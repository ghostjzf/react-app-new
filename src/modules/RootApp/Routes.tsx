import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loading from '@/components/Loading';
import menus from '@/stores/menus';

export default () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {menus.map((item) => {
          if (item.children) {
            return item.children.map((c) => {
              return <Route key={c.path} path={c.path} exact={true} component={c.component} />;
            });
          }
          return <Route key={item.path} path={item.path} exact={true} component={item.component} />;
        })}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};
