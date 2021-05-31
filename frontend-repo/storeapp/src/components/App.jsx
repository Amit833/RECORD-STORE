// import '../scss/App.scss';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "../components/Nav";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import cart from "./cart";
import Checkout from "./CheckOut";
import EmptyCart from "./EmptyCart";

import PrivateRoute from './PrivateRoute';
import { RecordStore } from "./RecordStore";
import NotFound404 from "./NotFound404";
import Footer from "./Footer";
import UpdateProfile from "./UpdateProfile";
import stripe from "./stripe"
import "../css/wrapContainer.css"



const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <div className="wrapContainer">
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/profile" component={UpdateProfile} />
            <PrivateRoute exact path='/store' component={RecordStore} />

            <Route path="/cart" component={cart} />
            <Route path="/stripe" component={stripe} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/emptycart" component={EmptyCart} />

          </div>
          <Route path="*" component={NotFound404} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
