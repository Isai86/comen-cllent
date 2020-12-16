import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Header from '../Components/Header';

export default function LayouPerfil(props) {
  const {routes} = props;
  return (
    <div>
      <Header/>

     <LoadRoutes routes={routes}/>
       
      <h2>Aqui va el footer</h2>
    </div>
  )
}


function LoadRoutes({ routes }) {
  return ( 
  <Switch> {
          routes.map((route, index) => (
               <Route key = { index }
               path = { route.path }
               exact = { route.exact }
               component = { route.component }
              />
          ))
      } 
      </Switch>
  );

}