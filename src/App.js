import React from "react";
import { Route, Switch } from "react-router-dom";

import "./default.scss";

import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

import Homepage from "./pages/Homepage";
import Registeration from "./pages/Registeration";

function App() {
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
          render={() => (
            <MainLayout>
              <Registeration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
