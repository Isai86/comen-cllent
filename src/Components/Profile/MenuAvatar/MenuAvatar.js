import React,{useCallback, useState, useEffect} from 'react'
import './MenuAvatar.scss';
import NoAvatar from '../../../assets/png/avatar.png'
import {Avatar,Button, Form, Input, Select, Row, Col} from "antd";
import {toast} from 'react-toastify';
import { EditOutlined, DollarOutlined, } from '@ant-design/icons';
import {useDropzone} from 'react-dropzone';
import {uploadAvatarApi,updateLugarApi} from '../../../api/lugar';
import {getAccessToken} from '../../../api/auth'



export default function MenuAvatar(props) {
  const {user, setIsVisible, setReloadUser} = props;
  const [logo, setLogo] = useState(null);
  const [userData, setUserData] = useState({})
  useEffect(() => {
   setUserData({
    phone:user.phone,
    website:user.website,
    delivery: user.delivery,
    tipo:user.tipo,
    descripcion: user.descripcion,
    lugarname:user.lugarname,
    logo: user.logo
   })
  }, [user])

  useEffect(() => {
    if(logo){
      setUserData({...userData, logo: logo.file})
    }
  }, [logo])


  const updateUser = e =>{
    e.preventDefault();
    const token = getAccessToken();
    let userUpdate = userData;

    if(!userUpdate.lugarname  || !userUpdate.tipo || !userUpdate.descripcion){
      toast.error("El nombre,descripción y tipo de comida son obligatorias.")
      return;
    }
    
    if(typeof userUpdate.logo === "object"){
      uploadAvatarApi(token, userUpdate.logo, user.uid).then(response =>{
        userUpdate.logo = response.logo;
        updateLugarApi(token, userUpdate, user.uid).then(result =>{
          toast.success("Se actualizo correctamente el producto") 
          setIsVisible(false);
          setReloadUser(true);
        })
      })
    }
    
    
    else{
      updateLugarApi(token, userUpdate, user.uid).then(result =>{
        toast.success("Se actualizo correctamente el usuario")
      })
      setIsVisible(false);
      setReloadUser(true);
    }
    }
  
  return(
    <div className="edit-form">
      <EditLogo logo={logo} setLogo={setLogo} user={user}/>
      <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
    </div>
  )

}

function EditLogo(props){
  const {setLogo, user} = props;

  const onDrop = useCallback(
    acceptedFiles =>{
        const file = acceptedFiles[0];
        setLogo({file, preview: URL.createObjectURL(file) });
    }, [setLogo]
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
         <Avatar size={150} src={NoAvatar} />
     ) :(
      <Avatar size={150} src={user.logo === `${user.logo}`  ? user.logo  : NoAvatar}/>
     )}
    </div>
)

}

function EditForm(props){
  const { userData, setUserData, updateUser} = props;
  const {Option} = Select;

  return(
    <div>
      <Form className="form-edit" onSubmitCapture={updateUser}>
      <Row gutter={24}>
       <Col span={24}>
       <Form.Item>
       <Input 
       prefix={<EditOutlined />}
       placeholder="¿Cuál es el nombre de tu negocio?"
       value={userData.lugarname}
       onChange={ e => setUserData({...userData, lugarname: e.target.value})}
       />
       </Form.Item>  
       </Col>
       </Row> 
       <Row gutter={24}>
       <Col span={12}>
       <Form.Item>
       <Input 
       prefix={<EditOutlined />}
       placeholder="Escribe tu sitio web"
       value={userData.website}
       onChange={ e => setUserData({...userData, website: e.target.value})}
       />
       </Form.Item>  
       </Col>  
       <Col span={12}>
       <Form.Item>
       <Input prefix={<DollarOutlined />}
       placeholder="Escribe un teléfono"
       value={userData.phone}
       onChange={ e => setUserData({...userData, phone: e.target.value})}
       />
       </Form.Item>   
       </Col>  
       </Row> 
       <Row gutter={24}>
       <Col span={12}>
      <Form.Item>
       <Select
       placeholder="Forma de entrega"
       value={userData.delivery}
       onChange={ e => setUserData({...userData, delivery: e })}
       >
        <Option value="No envió a Domicilio">No envió a Domicilio</Option> 
        <Option value="Solo por plataformas">Solo por plataformas</Option> 
        <Option value="Sin cargo Extra">Sin cargo Extra</Option> 
        <Option value="Un pequeño cargo extra">Un pequeño cargo extra</Option> 
        <Option value="Depende de la distancia">Depende de la distancia</Option> 
       </Select> 
       </Form.Item> 
       </Col>  
       <Col span={12}>
      <Form.Item>
       <Select
       placeholder="Tipo de restaurant"
       value={userData.tipo}
       onChange={ e => setUserData({...userData, tipo: e })}
       >
        <Option value="Cortes">Cortes de carne</Option> 
        <Option value="Bar">Bar o Antros</Option> 
        <Option value="Rapida">Comida Rápida</Option> 
        <Option value="Cafeteria">Cafetería</Option> 
        <Option value="Casera">Comida casera</Option> 
        <Option value="Restaurant">Restaurant</Option> 
        <Option value="Mariscos">Pescados y Mariscos</Option> 
        <Option value="Regional">Comida Regional</Option> 
        <Option value="Ensaladas">Ensaladas</Option> 
       </Select> 
       </Form.Item> 
       </Col>   
       </Row> 
       <Row gutter={24}>
       <Col span={24}>
       <Form.Item>
       <Input.TextArea
       className="TextArea"
       placeholder="Escribe la descripción de tu negocio...."
       value={userData.descripcion}
       onChange={ e => setUserData({...userData, descripcion: e.target.value})}
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