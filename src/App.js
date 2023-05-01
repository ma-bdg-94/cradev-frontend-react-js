// -- React and related libs
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";

// -- Redux
import { connect, Provider, useDispatch, useSelector } from "react-redux";

// -- Custom Components
import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// -- Redux Actions
import { logoutUser } from "./redux-store/slices/auth.slice";

// -- Third Party Libs
import "react-toastify/dist/ReactToastify.css"; // import first
import { ToastContainer } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.min.css';


// -- Component Styles
import "./styles/app.scss";
import store from "./redux-store";
import { loadUser } from "./redux-store/slices/auth.slice";

const PrivateRoute = ({ component, ...rest }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  if (!isAuthenticated) {
    dispatch(logoutUser());
    return <Redirect to="/login" />;
  } else {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

// if (localStorage.token) {
//   setToken(localStorage.token);
// }

const App = (props) => {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []); 
  return (
    <div>
        <ToastContainer />
        <HashRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Redirect to="/template/dashboard" />}
            />
            <Route
              path="/template"
              exact
              render={() => <Redirect to="/template/dashboard" />}
            />
            <PrivateRoute
              path="/template"
              dispatch={props.dispatch}
              component={LayoutComponent}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/error" exact component={ErrorPage} />
            <Route path="/register" exact component={Register} />
            <Route component={ErrorPage} />
            <Route
              path="*"
              exact={true}
              render={() => <Redirect to="/error" />}
            />
          </Switch>
          {/* <ToastContainer /> */}
        </HashRouter>
    </div>
  );
};

export default App;
