import React, {useState, useCallback,useEffect} from 'react';
import {signUpPromocionApi} from '../../../api/promociones';
import NoAvatarForm from '../../../assets/jpg/NoAvatarForm.jpg';
import {getAccessToken} from '../../../api/auth';
import {Form, Input, Button, Row, Col} from 'antd';
import {useDropzone} from 'react-dropzone';
import { toast } from 'react-toastify';
import { EditOutlined, DollarOutlined, } from '@ant-design/icons';
import './AddPromosForm.scss'
export default function AddPromosForm(props) {

  const {setIsVisible, setReloadPromociones} = props;
  const [promocion, setPromocion] = useState({});
  const [avatar, setAvatar] = useState(null);

  
  useEffect(() => {
    if(avatar){
      setPromocion({...promocion, avatar})
    }
  }, [avatar]);

  const addPromocion = e =>{
    e.preventDefault();

    if(!promocion.titulo || !promocion.descripcion){
      toast.error("El titulo y la descripción son obligatorias.")
      return;
    }else{
      const token = getAccessToken();

      signUpPromocionApi(token, promocion)
      .then(response =>{
        toast.success("Promoción creada correctamente")
      setIsVisible(false);
      setReloadPromociones(true);
      setPromocion({}) 
      })
      .catch(err =>{
        toast.error(err)
      })
      
    }
  }
  
  return (
    <div className="">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
      <AddForm
      promocion={promocion}
      setPromocion={setPromocion}
      addPromocion={addPromocion}
      />
      
    </div>
  )
}

function UploadAvatar(props){
  const  {avatar, setAvatar} = props;


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
           <img  src={avatar ? avatar.preview : NoAvatarForm} /> 
       )}
      </div>
  )
}



function AddForm(props){
  const {promocion,setPromocion, addPromocion} = props;

  return(
    <Form className="form-add" onSubmitCapture={addPromocion}>
     <Row gutter={24}>
     <Col span={12}>
       <Form.Item>
         <Input
         prefix={<EditOutlined />}
         placeholder="Nombre del Producto"
         defaultValue={promocion.titulo}
         onChange={e =>  setPromocion({...promocion, titulo: e.target.value})}
         />
       </Form.Item>
     </Col>
     <Col span={12}>
     <Form.Item>
      <Input prefix={<DollarOutlined />}
      placeholder="Precio"
      defaultValue={promocion.precio}
      onChange={ e => setPromocion({...promocion, precio: e.target.value})}
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
      defaultValue={promocion.descripcion}
      onChange={ e => setPromocion({...promocion, descripcion: e.target.value})}
      />
      </Form.Item>   
      </Col>   
      </Row> 
     <Form.Item>
          <Button type="primary" htmlType="onSubmit" className="btn-submit">
            Crear Promocion
          </Button>
        </Form.Item>
    </Form>
  )
}

