import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import * as ROUTES from '../Constants/routes'
import * as P from '../Pages'

const RouterSwitch = () => {
  let {path, url} = useRouteMatch();
  console.log(path)
  return (
    <Switch>
      <Route exact path={path} component={P.Products} />
      <Route path={`${path}${ROUTES.CART}`} component={P.Cart} />
      <Route path={`${path}${ROUTES.CHECK_OUT}`} component={P.CheckOut} />
      <Route path={`${path}${ROUTES.ORDERS}`} component={P.Orders} />
      <Route path={`${path}${ROUTES.ORDER_FAIL}`} component={P.OrderSuccess} />
      <Route path={`${path}${ROUTES.ORDER_SUCCESS}`} component={P.OrderFail} />
    </Switch>
  );
};

export default RouterSwitch;
