import React,{useState, useEffect} from 'react';
import { Form, Input,Select, Button, Row, Col} from 'antd';
import {toast} from 'react-toastify';
import {updateProductosApi} from '../../api/productos';
import {getAccessToken} from '../../api/auth';
import { FormOutlined } from '@ant-design/icons';
import {ReactComponent as Icono1} from "../../assets/svg/iconos/beef-steak.svg";
import {ReactComponent as Icono2} from "../../assets/svg/iconos/beer.svg";
import {ReactComponent as Icono3} from "../../assets/svg/iconos/bread.svg";
import {ReactComponent as Icono4} from "../../assets/svg/iconos/cocktails.svg";
import {ReactComponent as Icono5} from "../../assets/svg/iconos/coffee.svg";
import {ReactComponent as Icono6} from "../../assets/svg/iconos/ensalada.svg";
import {ReactComponent as Icono7} from "../../assets/svg/iconos/fish.svg";
import {ReactComponent as Icono8} from "../../assets/svg/iconos/frijoles-charros.svg";
import {ReactComponent as Icono9} from "../../assets/svg/iconos/one-hamburguer.svg";
import {ReactComponent as Icono10} from "../../assets/svg/iconos/onigiri.svg";
import {ReactComponent as Icono11} from "../../assets/svg/iconos/pizza.svg";
import {ReactComponent as Icono12} from "../../assets/svg/iconos/potato-chips.svg";
import {ReactComponent as Icono13} from "../../assets/svg/iconos/sandwich.svg";
import {ReactComponent as Icono14} from "../../assets/svg/iconos/shrimp.svg";
import {ReactComponent as Icono15} from "../../assets/svg/iconos/soft-drink.svg";
import {ReactComponent as Icono16} from "../../assets/svg/iconos/soup.svg";
import {ReactComponent as Icono17} from "../../assets/svg/iconos/spaghetti.svg";
import {ReactComponent as Icono18} from "../../assets/svg/iconos/stew.svg";
import {ReactComponent as Icono19} from "../../assets/svg/iconos/taco.svg";
import {ReactComponent as Icono20} from "../../assets/svg/iconos/tea-cup.svg";
import {ReactComponent as Icono21} from "../../assets/svg/iconos/wine.svg";
import {ReactComponent as Icono22} from "../../assets/svg/iconos/hotdog.svg";
import {ReactComponent as Icono23} from "../../assets/svg/iconos/roasted-chicken.svg";
import {ReactComponent as Icono24} from "../../assets/svg/iconos/chicken-bucket.svg";
import {ReactComponent as Icono25} from "../../assets/svg/iconos/pastel.svg";

import './EditProducto.scss';

export default function EditProducto(props) {
  const {productos,  setIsVisible,  setReloadProductos} = props;
  const [productosData, setproductosData] = useState({
    
  });

  useEffect(() => {
    setproductosData({
      nombre: productos.nombre,
      avatar: productos.avatar
    })
   }, [productos])

  const updateProductos = e =>{
    e.preventDefault();
    const token = getAccessToken();
    let productosUpdate = productosData;

    if(!productosUpdate.nombre){
      toast.error("El nombre del producto es obligatorio.")
      return;
    }else{
      updateProductosApi(token, productosUpdate, productos._id).then(result =>{
        toast.success("Se actualizo correctamente el producto")
      })
      setIsVisible(false);
      setReloadProductos(true);
    }
    
    
    
  }
  return (
    <div>
  <EditForm  productosData={productosData}setproductosData={ setproductosData} updateProductos={updateProductos}/>
    </div>
  )
}

function EditForm(props){
  const {Option} =Select;
  const { productosData, setproductosData, updateProductos}= props;
  return(
    <div>
      <Form className="form-edit" onSubmitCapture={updateProductos}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input 
              prefix={<FormOutlined />}
              placeholder="Nombre del Producto"
              value={productosData.nombre}
              onChange={e =>  setproductosData({...productosData, nombre: e.target.value})}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
           <Select  
          placeholder="selecciona un icono"
          onChange={e =>setproductosData({...productosData, avatar: e})}
          value={productosData.avatar}
          >
          <Option value="https://www.flaticon.com/svg/static/icons/svg/933/933310.svg"><Icono1/></Option>
          <Option value="https://www.flaticon.es/svg/static/icons/svg/931/931898.svg"><Icono2/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493109/iconos/yarj4gj0oxg94ed2sjuj.svg"><Icono3/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493109/iconos/eexfm14xozflstwed3qu.svg"><Icono4/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493111/iconos/rrfbdukwktj6n2euqfvb.svg"><Icono5/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493111/iconos/vqm7xispzjkhbtk6wub9.svg"><Icono6/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493111/iconos/fbglpukjifrcbj0zmvro.svg"><Icono7/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493111/iconos/pka9zklflupuui97uq2r.svg"><Icono8/></Option>
          <Option value="https://www.flaticon.com/svg/static/icons/svg/80/80159.svg"><Icono9/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493113/iconos/zih88t2a7fswieu2fy0l.svg"><Icono10/></Option>
          <Option value="https://www.flaticon.com/svg/static/icons/svg/599/599995.svg"><Icono11/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493114/iconos/qmksgx0lrcqlmjde8ayk.svg"><Icono12/></Option>
          <Option value="https://www.flaticon.es/svg/static/icons/svg/3075/3075724.svg"><Icono13/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493107/iconos/v1spocfxpwi5if6sjskr.svg"><Icono14/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493107/iconos/ofufrkuh3cvhqkyggxpg.svg"><Icono15/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493107/iconos/nvipvzh46t0lrteyz1mr.svg"><Icono16/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493107/iconos/o5fv0uh5vlcpun3e3wvb.svg"><Icono17/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493107/iconos/zatpkxhas8lg3mptjy2m.svg"><Icono18/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493107/iconos/f4tfhvlacf7dkupmf6lb.svg"><Icono19/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493109/iconos/ua4mfzzhcrhqupd3uqul.svg"><Icono20/></Option>
          <Option value="https://res.cloudinary.com/dqzjb92jc/image/upload/v1607493109/iconos/qheksdtk6mp0e2xzh1zu.svg"><Icono21/></Option>
          <Option value="https://www.flaticon.es/svg/static/icons/svg/1785/1785723.svg"><Icono22/></Option>
          <Option value="https://www.flaticon.es/svg/static/icons/svg/1702/1702803.svg"><Icono23/></Option>
          <Option value="https://www.flaticon.es/svg/static/icons/svg/1857/1857872.svg"><Icono24/></Option>
          <Option value="https://www.flaticon.es/svg/static/icons/svg/918/918234.svg"><Icono25/></Option>
          </Select>

            </Form.Item>
         
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="onSubmit" className="btn-submit">
            Actualizar Producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
