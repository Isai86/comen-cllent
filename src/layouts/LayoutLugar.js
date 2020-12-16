import React, { useState } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';
import { Layout } from "antd";
import useAuth from '../hooks/useAuth';
import MenuTop from '../Components/MenuTop';
import MenuSider from '../Components/SideBar/SideBar';
import "./LayoutLugar.scss";
import LugarSignIn from '../pages/SignIn';



export default function LayoutLugar(props) {
  const {routes} = props;
  const { Header, Content, Footer } = Layout;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const {user, isLoading} = useAuth();



  if(!user && !isLoading){
    return(
      <>
      <Route path="/Lugar/login" component={LugarSignIn} />
      <Redirect to ="/Lugar/login" />
      </>
    )
  }

  if(user && !isLoading){
   return (
    <Layout>
     <MenuSider menuCollapsed = { menuCollapsed }/>
      <Layout className = "Layout-admin"
            style = {
                { marginLeft: menuCollapsed ? "10px" : "10px",  }  }>
        <Header  className = "Layout-admin__header">
        <MenuTop menuCollapsed = { menuCollapsed }
            setMenuCollapsed = { setMenuCollapsed }
            /> 
        </Header>
        <Content className = "Layout-admin__content">
        <LoadRoutes routes = { routes }/>  
        </Content >
        <Footer className = "Layout-admin__footer" > La guia del Comensal  &copy; 2020</Footer>
      </Layout>
    </Layout>
      

  )  
  }

 return null;
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
