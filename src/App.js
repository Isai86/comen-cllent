import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import { ToastContainer } from "react-toastify";
import AuthProvider from './providers/AuthProvider';



import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Quicksand:wght@500&display=swap" rel="stylesheet"></link>
      <Switch>
{routes.map((route, index) =>(
  <RouteWithSubRoutes key={index}{...route} />
))}
      </Switch>
    </Router></AuthProvider>
    
  );
}

function RouteWithSubRoutes(route){
  return (
  <Route 
  path={route.path}
  exact={route.exact}
  render={props => <route.component routes={route.routes}{...props}/>}
  />
  );
}


export default App;
