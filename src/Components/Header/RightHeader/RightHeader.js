import React from 'react';
import {Avatar} from 'antd';
//import {Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {ReactComponent as MenuIcon} from "../../../assets/svg/menu.svg";
import ImageNoFound from "../../../assets/png/avatar.png";

import './RightHeader.scss';

export default function RightHeader() {
  return (
    <>
      <div className="right-header">
        
        
        <Link to="/Menu/:id">
        <MenuIcon/>
        </Link>
        <Link to="/Perfil/:id">
        <Avatar src={ImageNoFound} avatar/>
        </Link>
      </div>
    </>
  )
}
