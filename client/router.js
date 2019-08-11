import React from "react";
import App from "./app.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";


class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/user/:user_id" component={App} />
          <Route path="/*" component={Dashboard} />
          <Route component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
