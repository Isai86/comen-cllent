import React,{useState, useEffect} from 'react';
import {getAccessToken} from '../../api/auth';
import {getPromocionApi, deletePromocionApi} from '../../api/promociones';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {List,Avatar, Button, Modal as ModalAntd, Image } from 'antd';
import EditPromoForm from './EditPromoForm';
import AddPromosForm from './AddPromosForm'
import NoAvatar from '../../assets/png/NoImagePro.png';
import Modal from '../../Components/modal';
import { toast } from 'react-toastify';
import './Promo.scss';
export default function Promo() {
  const {confirm} = ModalAntd;
  const [promocion, setPromocion] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [reloadPromociones, setReloadPromociones] = useState(false);
 const token = getAccessToken();

 const addProductoModal = () =>{
  setIsVisible(true);
  setModalTitle("Creando una nueva Promoción")
  setModalContent(
    <AddPromosForm setIsVisible={setIsVisible} setReloadPromociones={setReloadPromociones}/>
  )
 }

 useEffect(() => {
   getPromocionApi(token).then(response =>{
     setPromocion(response.promocion);
   })
   setReloadPromociones(false);
 }, [token, reloadPromociones])

 const showDeleteConfirm = promocion =>{
  const token= getAccessToken();

  confirm({
      title:"Eliminar usuario",
      content: `¿Estás seguro que quieres eliminar a ${promocion.titulo}?`,
      okText:"Eliminar",
      okType:"danger",
      cancelText:"Cancelar",
      onOk(){
          deletePromocionApi(token, promocion._id)
          .then(response =>{
              toast.success("Esta promoción se elimino correctamente");
              setReloadPromociones(true);
              
          })
          .catch(err =>{
              toast.error(err)
          })
      }
  })
}

 const editPromocion = promocion =>{
 setIsVisible(true)
 setModalTitle(`Editar ${promocion.titulo  ? promocion.titulo : "Ingresa un titulo para tu promoción"}`)
 setModalContent(<EditPromoForm promocion={promocion} setIsVisible={setIsVisible} setReloadPromociones={setReloadPromociones}/>)
}


  return (
    <div className="list-promociones">
      <div className="titulos">
      <h1>Crea o edita una promoción</h1>
      <Button
        type="primary"
        onClick={addProductoModal}
        >
          Agregar Promoción
        </Button>  
      </div>
       <List
      className="productos__lista"
      itemLayout="horizontal"
      dataSource={promocion}
      renderItem={promocion =>(
        <List.Item
        actions={[
          <Button
          type="primary"
          onClick={() => editPromocion(promocion) }>
           <EditOutlined />
          </Button>,
          <Button
          type="danger"
          onClick={() => showDeleteConfirm(promocion)}
          >
           <DeleteOutlined />
          </Button>
          
        ]}
        >
          <List.Item.Meta
          avatar={ <Avatar src={promocion.avatar === `${promocion.avatar}`  ? promocion.avatar  : NoAvatar 
        }/>}
          title={`${promocion.titulo ? promocion.titulo : 'Escribe un titulo para tu promocion'}`}
          description={promocion.descripcion }
          
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
