import React, {useState, useEffect} from 'react';
import {getAccessToken} from '../../../api/auth';
import {getProductosApi} from '../../../api/subProductos';
import {useParams} from 'react-router-dom';
import Modal from '../../../Components/modal';
import './SubProductos.scss';





export default function SubProductos() {
  const {id} = useParams();
  const [subProducto, setSubProducto] = useState([]);
  const token = getAccessToken();
  const producto = id;
  

  console.log({subProducto});
  useEffect(() => {
    getProductosApi(token, producto).then(response =>{
      console.log(response);
    })
  }, [token, producto])
  return (
    <div>
      <h1>Aqui se van a colocar todos los datos de </h1>
    </div>
  )
}


/* export default function SubProductos() {
  const {id} = useParams();
  const [productos, setProductos] = useState([]);
  const token = getAccessToken();

  const {productoData} = productos;


  useEffect(() => {
    getProductoDataApi(token, id).then(response =>{
      setProductos(response);
    })
  }, [token, id])
  return (
    <div>
      <PerfilSP producto={productoData}/>
    </div>
  )
}
 */