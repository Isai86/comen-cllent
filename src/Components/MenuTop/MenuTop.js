import React from 'react';
import {Button} from 'antd';
import { Icon } from 'semantic-ui-react'
import Logo from "../../assets/png/LogoLetreroLat.png";
import {logout} from '../../api/auth';
import './MenuTop.scss';


export default function MenuTop(props){
    const {menuCollapsed, setMenuCollapsed} = props;

    const logoutUser = () =>{
        logout();
        window.location.reload();
    }
   
    return (
        <div className="menu-top">
          <div className="menu-top__left">
              <img className="menu-top__left-logo"
              src={Logo}
              alt="OficiosApp"
              />
              <Button type="link"  icon={menuCollapsed ?<Icon name='chevron right' />:<Icon name='chevron left' />}
               onClick={()=> setMenuCollapsed(!menuCollapsed)}>
              </Button>
          </div>
          <div className="menu-top__right" >
              <Button type="link" onClick={logoutUser}>
              <Icon name='close' />
              </Button>
          </div>
        </div>
    )
}


