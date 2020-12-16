import React, {useState, useEffect} from 'react';
import {Grid, Image, Container, Icon, Button} from 'semantic-ui-react';
import MenuAvatar from './MenuAvatar';
import {
  MessageOutlined,HeartOutlined,StarOutlined, EyeOutlined
} from '@ant-design/icons';
import ImageNotFount from '../../assets/png/avatar.png';
import Modal from '../../Components/modal';
import "./Profile.scss"

export default function Profile(props) {
  const {user, setReloadUser} = props;
  const [isVisible, setIsVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [logo, setLogo] = useState(null)
  


  const addProductoModal = () =>{
    setIsVisible(true);
    setModalTitle("EDITAR MI PERFIL");
    setModalContent(
      <MenuAvatar setIsVisible={setIsVisible} setReloadUser={setReloadUser} user={user} logo={logo} setLogo={setLogo} />
    )
   }

  return (
    <Container>
    <Grid className="profile">
    <Grid.Row columns={4} tablet={8} movile={16} className="profile__detalles">
      <Grid.Column>
        <Container className="like">
        <HeartOutlined />
        <p>Me Gusta</p>
        </Container>
        </Grid.Column>
      <Grid.Column>
        <Container className="coments">
        <MessageOutlined />
        <p>Comentarios</p>    
        </Container>
     </Grid.Column>
      <Grid.Column>
        <Container className="calificacion">
        <StarOutlined />
        <p>Calificación</p>    
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Container className="views">
        <EyeOutlined />
        <p>Vistas</p>    
        </Container>
      </Grid.Column>
    </Grid.Row>  
    </Grid> 
    <Grid>
    { user ?
    <Grid.Column width={5} className="profile__left">   
      <Image src={`${user.logo ? user.logo : ImageNotFount}`} avatar/>
    </Grid.Column>
 :
<Grid.Column width={5} className="profile__left">   
<Image src={ImageNotFount} avatar/>
</Grid.Column>}
    { user ?
    <Grid.Column width={11} className="profile__right">
    <h1>{`${user.lugarname ? user.lugarname: "Escribe el nombre de tu establecimiento"}`}</h1> 
      <div className="other">
      <Icon name='user outline'/>  {`${user.nombre ? user.nombre: "Agregar nombre de usuario"}`}
      </div>
      <div className="description">
      <Icon name='at'/>  {`${user.website ? user.website: "Si tienes un sitio web, anotalo aquí"}`}
      </div>
      <div className="description">
      <Icon name='bicycle'/>  {`${user.delivery ? user.delivery: "Agrega el tipo de envio que realizas"}`}
      </div>
      <div className="description">
      <Icon name='phone'/>  {`${user.phone ? user.phone: "Agrega un teléfono de contacto"}`}
      </div>
      <div className="description">
      <Icon name='spoon'/>  {`${user.tipo ? user.tipo: "¿Qué tipo de comida ofreces?"}`}
      </div>
      <div className="description">
      <Button onClick={() => addProductoModal(true)}>Editar Información</Button>
      </div>
      
    </Grid.Column>
     :
     <Grid.Column width={11}>
       <h1>No hay datos de usuario</h1>
     </Grid.Column>
     } 
    </Grid> 
    <Grid>
      <Grid.Column width={16} className="descripcion-user">
        {user ? <h3>  {`${user.descripcion ? user.descripcion: "Agrega una descripción de tu establecimiento..."}`}</h3> : <h2>No se pueden mostrar los datos de usuario</h2>}
      </Grid.Column>
    </Grid>
    <Modal
      title={modalTitle}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
       >
       {modalContent} 
      </Modal>
    </Container>
    
  )
}
