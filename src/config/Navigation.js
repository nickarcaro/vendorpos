import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";
const Navigation = () => {
  //codigo js
  return (
    <Router>
      <Switch>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            )}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default Navigation;
