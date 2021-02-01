import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import "./default.scss";

import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

import Homepage from "./pages/Homepage";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import { auth, handleUserProfile } from "./firebase/utils";
import Recovery from "./pages/Recovery";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";
import Dashboard from "./pages/Dashboard";
import WithAuth from "./hoc/withAuth";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListner = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
    return () => {
      authListner();
    };
  });

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />

        <Route
          path="/registeration"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Registeration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
