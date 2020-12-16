import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import {signInLugarApi} from '../../../api/lugar';
import {emailValidation, minLengthValidation} from '../../../utils/formValidation';
import {ACCESS_TOKEN, LUGAR} from '../../../utils/constants';
import './LoginForm.scss';

export default function LoginForm() {



  const [inputs, setInputs] = useState({
    email:"",
    password:""
  });

  const [formValid, setFormValid] = useState({
    email:false,
    password:false,
  });

  const changeForm = e =>{
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const inputValidation = e =>{
    const {type, name} = e.target;

    if(type === "email"){
        setFormValid({
            ...formValid,
            [name]:emailValidation(e.target)
        });
    }
    if(type === "password"){
        setFormValid({
            ...formValid,
            [name]: minLengthValidation(e.target, 6)
        });
    }
  };

  const login = async  e =>{
    e.preventDefault();

      const emailVal = inputs.email;
      const passwordVal = inputs.password;

    if(!emailVal  || !passwordVal  ){
      toast.error("Todos los campos son obligatorios.");
       } else{
             const result = await signInLugarApi(inputs);
             
             if(!result.ok){
               toast.error(result.msg)
          }else{
            const {token} = result;
  localStorage.setItem(ACCESS_TOKEN, token);
  toast.success("Login Correcto.");
  window.location.href = "/Lugar";
          }
           }

  }



  return (
    <Form className="login-form" onChange={changeForm} onSubmit={login}>
      <h2>Iniciar Sesión con como <span>RESTAURANTERO</span></h2>
      <Form.Input
         type="text"
         placeholder="Correo Electronico"
         name="email"
         onChange={inputValidation}
         value={inputs.email}
         />
         <Form.Input
         type="password"
         placeholder="Contraseña"
         name="password"
         onChange={inputValidation}
         value={inputs.password}
         />
     <Button type="submit" className="btn-submit">Iniciar Sesión</Button>

     <p>¿Olvidaste tu contraseña? <span>Recuperala aquí</span></p>
    </Form>
    
  )
}
