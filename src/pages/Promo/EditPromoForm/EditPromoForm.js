import React,{useState,useCallback, useEffect} from 'react'
import NoAvatarForm from '../../../assets/png/NoImagePro.png';
import './EditPromoForm.scss';
import { Form, Input, Button, Row, Col, Spin} from 'antd';
import {toast} from 'react-toastify';
import {updatePromocionApi, uploadImageApi} from '../../../api/promociones';
import {getAccessToken} from '../../../api/auth';
import {useDropzone} from 'react-dropzone';
import { EditOutlined, DollarOutlined, } from '@ant-design/icons';

export default function EditPromoForm(props) {
  const {promocion,  setIsVisible,  setReloadPromociones} = props;
  const [avatar, setAvatar] = useState(null);
  const [promocionData, setPromocionData] = useState({ });


  useEffect(() => {
    setPromocionData({
    titulo: promocion.titulo,
    descripcion: promocion.descripcion,
    precio: promocion.precio,
    avatar: promocion.avatar
    })
   }, [promocion])


  useEffect(() => {
    if(avatar){
      setPromocionData({...promocionData,avatar: avatar.file})
    }
  }, [avatar]);

  const updatePromocion = e =>{
    e.preventDefault();
    const token = getAccessToken();
    let promocionUpdate = promocionData;

    if(!promocionUpdate.titulo || !promocionUpdate.descripcion){
      toast.error("El titulo y la descripción son obligatorias.")
      return;
    }
    if(typeof promocionUpdate.avatar === "object"){
      uploadImageApi(token, promocionUpdate.avatar, promocion._id).then(response =>{
        promocionUpdate.avatar = response.avatar;
        updatePromocionApi(token, promocionUpdate, promocion._id).then(result =>{
          toast.success("Se actualizo correctamente el producto") 
          setIsVisible(false);
          setReloadPromociones(true);
        })
      })
    }
    
    
    else{
      updatePromocionApi(token, promocionUpdate, promocion._id).then(result =>{
        toast.success("Se actualizo correctamente el producto")
      })
      setIsVisible(false);
      setReloadPromociones(true);
    }
    
    
    
  }

  return (
    <div>
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} promocion={promocion} />
      <EditForm promocionData={promocionData} setPromocionData={setPromocionData} updatePromocion={updatePromocion} />
    </div>
  )
}


function UploadAvatar(props){
  const  {setAvatar, promocion} = props;

  const onDrop = useCallback(
    acceptedFiles =>{
        const file = acceptedFiles[0];
        setAvatar({file, preview: URL.createObjectURL(file) });
    }, [setAvatar]
);
const {getRootProps, getInputProps, IsDragActive} = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
});
  return(
      <div className="upload-avatar" {...getRootProps()}>
       <input {...getInputProps()}/>
       {IsDragActive ? (
           <img src={NoAvatarForm} />
       ) :(
           <img  src={promocion.avatar ? promocion.avatar : NoAvatarForm} /> 
       )}
      </div>
  )
}

function EditForm(props){
  const {promocionData, setPromocionData, updatePromocion } = props;
  return(
   <div>
     <Form className="form-edit" onSubmitCapture={updatePromocion}>
      <Row gutter={24}>
      <Col span={12}>
      <Form.Item>
      <Input 
      prefix={<EditOutlined />}
      placeholder="Titulo de la promoción"
      value={promocionData.titulo}
      onChange={ e => setPromocionData({...promocionData, titulo: e.target.value})}
      />
      </Form.Item>  
      </Col>  
      <Col span={12}>
      <Form.Item>
      <Input prefix={<DollarOutlined />}
      placeholder="Agregar un precio"
      value={promocionData.precio}
      onChange={ e => setPromocionData({...promocionData, precio: e.target.value})}
      />
      </Form.Item>   
      </Col>  
      </Row> 
      <Row gutter={24}>
      <Col span={24}>
      <Form.Item>
      <Input.TextArea
      className="TextArea"
      placeholder="Escribe la descripción de tu promoción...."
      value={promocionData.descripcion}
      onChange={ e => setPromocionData({...promocionData, descripcion: e.target.value})}
      />
      </Form.Item>   
      </Col>   
      </Row> 
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Promoción
        </Button>
      </Form.Item>
     </Form>
   </div>
  )

}