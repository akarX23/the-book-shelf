import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Components/Home/home";
import Layout from "./hoc/layout";
import BookView from "./Components/Books";
import LogIn from "./Containers/Admin/login";
import Auth from "./hoc/auth";
import User from "./Components/Admin";
import AddReview from "./Containers/AddReview";
import UserReviews from "./Containers/UserReviews";
import EditReview from "./Containers/EditReview";
import AddUser from "./Containers/AddUser";
import Logout from "./Containers/Logout";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/books/:id" exact component={Auth(BookView)} />
        <Route path="/login" exact component={Auth(LogIn, false)} />
        <Route path="/user" exact component={Auth(User, true)} />
        <Route path="/user/add" exact component={Auth(AddReview, true)} />
        <Route
          path="/user/user-reviews"
          exact
          component={Auth(UserReviews, true)}
        />
        <Route
          path="/user/edit-post/:id"
          exact
          component={Auth(EditReview, true)}
        />
        <Route path="/user/register" exact component={Auth(AddUser, null)} />
        <Route path="/user/logout" exact component={Auth(Logout, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
