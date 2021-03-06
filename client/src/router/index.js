import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//pages
import Sign from "../pages/sign";
import Panel from "../pages/panel";
import SessionHOC from "../components/HOC/session";

const Root = ({ session, error }) => {
  return (
    <Router>
      <Switch>
        <Route path="/sign">
          {!error && session ? <Panel session={session.user} /> : <Sign />}
        </Route>
        <Route path="/" exact>
          {!error && session ? <Panel session={session.user} /> : <Sign />}
        </Route>
        <Redirect to="/sign" />
      </Switch>
    </Router>
  );
};
export default SessionHOC(Root);
