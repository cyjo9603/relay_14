import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product

//About Auth
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import SearchPage from "./views/SearchPage/SearchPage.js";
import YouKnowPage from "./views/YouKnowPage/YouKnowPage.js";
import FindPage from "./views/FindPage/FindPage.js";
import FindResultPage from "./views/FindResultPage/FindResultPage.js"

import test from "./views/LandingPage/test.js";


import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

//import {BACK_URL } from '../components/Config.js';
//About User
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="wrapper">
        <NavBar />
        <div className="contentsWrapSpacer" />
        <Switch>
          <div className="contentsWrap">
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/test" component={Auth(test, null)} />
            <Route exact path="/search" component={Auth(SearchPage, null)} />
            <Route exact path="/search/:key" component={Auth(SearchPage, null)} />
            <Route exact path="/youknow" component={Auth(YouKnowPage, true)} />
            <Route exact path="/find" component={Auth(FindPage, true)} />
            <Route exact path="/findResult" component={Auth(FindResultPage, true)} />
          </div>
          <Route component={Auth(NotFoundPage, null)} />
        </Switch>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;