/* import React,{useState, useEffect} from 'react';
import {Image} from 'antd';
import './PefilSP.scss';
import {getAccessToken} from '../../../../api/auth';
import {getProductosApi} from '../../../../api/subProductos';
export default function PefilSP(props) {
  const {producto} = props;
  const token = getAccessToken();
  const [subProducto , setSubProducto ] = useState([])
  console.log(subProducto);
  useEffect(() => {
    getProductosApi(token).then(response =>{
      console.log(response);
    })
  }, [token])
  
  return (
    <div className="sub-producto">
      {producto ?
      <h1><Image src={producto.avatar}/> {producto.nombre}</h1>

       : <h1>No se puede mostrar producto</h1>}
    </div>
  )
} */
