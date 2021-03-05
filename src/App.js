import React,{useEffect} from 'react'
import './App.css';
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from "./Login";
import {auth} from "./firebase";
import { useStateValue } from './StateProvider';
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe("pk_test_51IO4nCHtPgpZUuSk5qQaTt5TcqVLbNDzBVPuNv4WiyAInnX17iqFs8qFId7e9UUuOE6gBtDIEg2VaKyUunzKXTD300ykoS6UBD");


function App() {
  const [{},dispatch] = useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged(authUser => {


      if(authUser){
        //User was logged in

        dispatch({
          type:"SET_USER",
          user: authUser
        })
      } else{
        //User logged out

        dispatch({
          type:"SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
      
        <Switch>

          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
          <Header/>      
            <Checkout/>
          </Route>
          
          <Route path="/payment">
             <Header/>
             <Elements stripe={promise}>
              <Payment/>
             </Elements>
           
          </Route>

          <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
          <Route path="/">
          <Header/>
            <Home/>
          </Route>
          
        </Switch>
      
    </div>

    </Router>
      );
}

export default App;
