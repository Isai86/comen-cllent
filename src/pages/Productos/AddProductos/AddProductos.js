import React, {useState} from 'react';
import {signUpProductosApi} from '../../../api/productos';
import {getAccessToken} from '../../../api/auth';
import {Form, Input, Select, Button, Row, Col} from 'antd';
import { toast } from 'react-toastify';
import { FormOutlined } from '@ant-design/icons';
import './AddProductos.scss'

//Iconos del selector
import {ReactComponent as Icono1} from "../../../assets/svg/iconos/beef-steak.svg";
import {ReactComponent as Icono2} from "../../../assets/svg/iconos/beer.svg";
import {ReactComponent as Icono3} from "../../../assets/svg/iconos/bread.svg";
import {ReactComponent as Icono4} from "../../../assets/svg/iconos/cocktails.svg";
import {ReactComponent as Icono5} from "../../../assets/svg/iconos/coffee.svg";
import {ReactComponent as Icono6} from "../../../assets/svg/iconos/ensalada.svg";
import {ReactComponent as Icono7} from "../../../assets/svg/iconos/fish.svg";
import {ReactComponent as Icono8} from "../../../assets/svg/iconos/frijoles-charros.svg";
import {ReactComponent as Icono9} from "../../../assets/svg/iconos/one-hamburguer.svg";
import {ReactComponent as Icono10} from "../../../assets/svg/iconos/onigiri.svg";
import {ReactComponent as Icono11} from "../../../assets/svg/iconos/pizza.svg";
import {ReactComponent as Icono12} from "../../../assets/svg/iconos/potato-chips.svg";
import {ReactComponent as Icono13} from "../../../assets/svg/iconos/sandwich.svg";
import {ReactComponent as Icono14} from "../../../assets/svg/iconos/shrimp.svg";
import {ReactComponent as Icono15} from "../../../assets/svg/iconos/soft-drink.svg";
import {ReactComponent as Icono16} from "../../../assets/svg/iconos/soup.svg";
import {ReactComponent as Icono17} from "../../../assets/svg/iconos/spaghetti.svg";
import {ReactComponent as Icono18} from "../../../assets/svg/iconos/stew.svg";
import {ReactComponent as Icono19} from "../../../assets/svg/iconos/taco.svg";
import {ReactComponent as Icono20} from "../../../assets/svg/iconos/tea-cup.svg";
import {ReactComponent as Icono21} from "../../../assets/svg/iconos/wine.svg";

export default function AddProductos(props) {
  const {setIsVisible, setReloadProductos} = props;
  const [producto, setProducto] = useState({});

  const addProductos = e =>{
    e.preventDefault();

    if(!producto.nombre){
      toast.error("El nombre del producto es obligatorio")
    }else{
      const token = getAccessToken();

      signUpProductosApi(token, producto)
      .then(response =>{
        toast.success("Producto creado correctamente")
      setIsVisible(false);
      setReloadProductos(true);
      setProducto({}) 
      })
      .catch(err =>{
        toast.error(err)
      })
      
    }
  }
  
  return (
    <div className="add-producto-form">
      <AddForm
      producto={producto}
      setProducto={setProducto}
      addProductos={addProductos}
      />
    </div>
  )
}




function AddForm(props){
  const {producto,setProducto, addProductos} = props;
  const {Option} = Select;

  return(
    <Form className="form-add" onSubmitCapture={addProductos}>
     <Row gutter={24}>
     <Col span={12}>
       <Form.Item>
         <Input
         prefix={<FormOutlined />}
         placeholder="Nombre del Producto"
         defaultValue={producto.nombre}
         onChange={e =>  setProducto({...producto, nombre: e.target.value})}
         />
       </Form.Item>
     </Col>
     <Col span={12}>
       <Form.Item>
       <Select  
          placeholder="selecciona un icono"
          onChange={e =>setProducto({...producto, avatar: e})}
          defaultValue={producto.value}
          >
          <Option value="Icono1"><Icono1/></Option>
          <Option value="Icono2"><Icono2/></Option>
          <Option value="Icono3"><Icono3/></Option>
          <Option value="Icono4"><Icono4/></Option>
          <Option value="Icono5"><Icono5/></Option>
          <Option value="Icono6"><Icono6/></Option>
          <Option value="Icono7"><Icono7/></Option>
          <Option value="Icono8"><Icono8/></Option>
          <Option value="Icono9"><Icono9/></Option>
          <Option value="Icono10"><Icono10/></Option>
          <Option value="Icono11"><Icono11/></Option>
          <Option value="Icono12"><Icono12/></Option>
          <Option value="Icono13"><Icono13/></Option>
          <Option value="Icono14"><Icono14/></Option>
          <Option value="Icono15"><Icono15/></Option>
          <Option value="Icono16"><Icono16/></Option>
          <Option value="Icono17"><Icono17/></Option>
          <Option value="Icono18"><Icono18/></Option>
          <Option value="Icono19"><Icono19/></Option>
          <Option value="Icono20"><Icono20/></Option>
          <Option value="Icono21"><Icono21/></Option>
          </Select>
       </Form.Item>
     </Col>
     </Row>
     <Form.Item>
          <Button type="primary" htmlType="onSubmit" className="btn-submit">
            Crear Producto
          </Button>
        </Form.Item>
    </Form>
  )
}
