import React from 'react'
import {Route, Switch} from 'react-router-dom';

export default function Layoutbasic(props) {
  const {routes} = props;
  return (
    <div>
      <h1>Aquí va el menú de las rutas direccionales</h1>

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