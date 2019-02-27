import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Register from './screens/register'
import Login from "./screens/login"
import ResetPassword from "./screens/resetPassword"
import ForgotPassword from "./screens/forgotPassword"
class App extends Component {
 render() {
   return (
     <Router>
     <div className="App">
       <Route path="/register" component={Register}/>
       <Route path="/login" component={Login}/>
       <Route path="/resetPassword" component={ResetPassword}/>
       <Route path="/forgotPassword" component={ForgotPassword}/>
     </div>
     </Router>
   );
 }
}

export default App;
