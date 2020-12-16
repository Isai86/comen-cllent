import React,{useState} from 'react';
import {Container, Image} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import RegisterForm from '../../Components/Auth/RegisterForm';
import LoginForm from '../../Components/Auth/LoginForm';
import Logo from '../../assets/png/logoLetreroAbajo.png';
import {getAccessToken} from '../../api/auth';
import './SignIn.scss';

export default function SignIn() {
  const [showLogin, setShowLogin] = useState(true)

  if(getAccessToken()){
   return <Redirect to="/Lugar" />
  }
  return (
   <Container fluid className="auth">
     <Image src={Logo}/>

     <div className="container-form">
       {showLogin ? <LoginForm/> : <RegisterForm setShowLogin={setShowLogin}/> }
     </div>
     <div className="change-form">
       <p>{
        showLogin ? (
          <>
          ¿No tienes cuenta?
          <span onClick={()=> setShowLogin(!showLogin)}> Registrate</span>
          </>
        ):
        (
          <>
          ¿Deseas Iniciar Sesión?
          <span onClick={()=> setShowLogin(!showLogin)}>Login</span>
          </>
        )
       }</p>
       
       
     </div>
   </Container>
  )
}
