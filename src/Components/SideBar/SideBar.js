import React from 'react';
//import {ReactComponent as Icono1} from "../../assets/svg/category.svg";

import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {ShopOutlined ,PictureOutlined,AlertOutlined , ProfileOutlined, EnvironmentOutlined} from '@ant-design/icons';
import './SideBar.scss';

function MenuSider(props){
 const {menuCollapsed, location} = props;
 const {Sider} = Layout;
 
    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/Lugar">
                    <Link to={"/Lugar"}>
                    <ShopOutlined />
                        <span className="nav-text">Perfil</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/Lugar/Promociones">
                    <Link to={"/Lugar/Promociones"}>
                    <AlertOutlined />
                        <span className="nav-text">Promociones</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/Lugar/Slide">
                    <Link to={"/Lugar/Slide"}>
                    <PictureOutlined />
                        <span className="nav-text">SliderAnuncios</span>  
                    </Link>
                </Menu.Item>
                <Menu.Item key="/Lugar/Productos">
                    <Link to={"/Lugar/Productos"}>
                    <ProfileOutlined />
                    <span className="nav-text">Categorias</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/Lugar/Ubicacion">
                    <Link to={"/Lugar/Ubicacion"}>
                    <EnvironmentOutlined />
                    <span className="nav-text">Ubicacion</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);