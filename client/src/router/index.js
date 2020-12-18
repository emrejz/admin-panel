import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Sign from "../pages/sign";
import Panel from "../pages/panel";

export default () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          <Route path="/sign">
            <Sign />
          </Route>
          <Route path="/panel">
            <Panel />
          </Route>
          <Redirect to="/sign" />
        </Switch>
      </div>
    </Router>
  );
};
