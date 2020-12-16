import React ,{useEffect, useState} from 'react';
import {getProductosApi, deleteProductosApi} from '../../api/productos';
import {getAccessToken} from '../../api/auth';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {List,Avatar, Button, Modal as ModalAntd, Image } from 'antd';
import NoAvatar from '../../assets/svg/food.svg';
import Modal from '../../Components/modal';
import EditProductoForm from '../../Components/EditProducto';
import AddProductosForm from './AddProductos';
import {Link} from 'react-router-dom';
import './Productos.scss';
import { toast } from 'react-toastify';
const {confirm} = ModalAntd;
export default function Productos() {
  const [productos, setproductos] = useState([]);
  const token = getAccessToken();
  const [isVisible, setIsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [reloadProductos, setReloadProductos] = useState(false);

  const addProductoModal = () =>{
   setIsVisible(true);
   setModalTitle("Creando nuevo producto");
   setModalContent(
     <AddProductosForm setIsVisible={setIsVisible} setReloadProductos={setReloadProductos}/>
   )
  }

  const editProducto = productos =>{
    setIsVisible(true);
    setModalTitle(`Editar ${productos.nombre  ? productos.nombre : "Ingresa nombre del producto"}`)
    setModalContent(<EditProductoForm productos={productos} setIsVisible={setIsVisible} setReloadProductos={setReloadProductos}/>)
  }

  useEffect(() => {
    getProductosApi(token).then(response =>{
      setproductos(response.productos);
    });
    setReloadProductos(false);
  }, [token, reloadProductos])

  
  
  const showDeleteConfirm = productos =>{
    const token= getAccessToken();

    confirm({
        title:"Eliminar usuario",
        content: `¿Estás seguro que quieres eliminar a ${productos.nombre}?`,
        okText:"Eliminar",
        okType:"danger",
        cancelText:"Cancelar",
        onOk(){
            deleteProductosApi(token, productos._id)
            .then(response =>{
                toast.success("Se elimino este producto correctamente");
                setReloadProductos(true);
                
            })
            .catch(err =>{
                toast.error(err)
            })
        }
    })
}



  return (
    <div className="productos">
      <div className="header__productos">
      <h1>Crea una categoria </h1>
        <Button
        type="primary"
        onClick={addProductoModal}
        >
          Agregar Categoria
        </Button>
      </div>
      <List
      className="productos__lista"
      itemLayout="horizontal"
      dataSource={productos}
      renderItem={productos =>(
        <List.Item
        actions={[
          <Button
          type="primary"
          onClick={() => editProducto(productos) }>
           <EditOutlined />
          </Button>,
          <Button
          type="danger"
          onClick={() => showDeleteConfirm(productos)}
          >
           <DeleteOutlined />
          </Button>
          
        ]}
        >
          <List.Item.Meta
          avatar={ <Avatar src={productos.avatar === `${productos.avatar}`  ? productos.avatar  : NoAvatar 
        }/>}
          title={`${productos.nombre ? productos.nombre : 'Aqui va el nombre del producto'}`}
          description={ <Link to={`${productos._id}`} productos={productos} >Ir a la sección de {productos.nombre}</Link> }
          />
        </List.Item>
      )}
      >
      </List>
      <Modal
      title={modalTitle}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
       >
       {modalContent} 
      </Modal>
    </div>
  )
}
