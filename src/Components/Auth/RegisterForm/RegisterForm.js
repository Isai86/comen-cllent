import React, {useState} from 'react'
import "./RegisterForm.scss";
import {Form, Button} from 'semantic-ui-react';
import {signUpLugarApi} from '../../../api/lugar';
import {toast} from 'react-toastify';
import {emailValidation, minLengthValidation} from '../../../utils/formValidation';
export default function RegisterForm() {

   const [inputs, setInputs] = useState({
     nombre:"",
     email:"",
     lugarname:"",
     password:"",
     repeatpassword:"",
    });

    const [formValid, setFormValid] = useState({
      nombre:false,
      lugarname:false,
      email:false,
      password:false,
      repeatpassword:false
    });

    const changeForm = e =>{
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      })
    }

    const inputValidation = e =>{
      const {type, name} = e.target;

      if(type === "text"){
        setFormValid({
            ...formValid,
            [name]: minLengthValidation(e.target, 4)
        });
      }

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

    const register = async  e =>{
      e.preventDefault();

      const nameVal = inputs.nombre;
      const lugarnameVal = inputs.lugarname;
        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatpassword;

      if(!nameVal  ||!lugarnameVal  ||!emailVal  || !passwordVal || !repeatPasswordVal ){
        toast.error("Todos los campos son obligatorios.");
         } else{
             if(passwordVal !== repeatPasswordVal){
                toast.error("Las contraseñas tienen que ser iguales.")
             }else{
               const result = await signUpLugarApi(inputs);
               
               if(!result.ok){
                 toast.error(result.message)
            }else{
               toast.success(result.message);
               resetForm(); 
            }
             }
         }

    }


    const resetForm = () =>{
      const inputs = document.getElementsByTagName('input');

      for(let i = 0; i < inputs.length; i++){
          inputs[i].classList.remove("success");
          inputs[i].classList.remove("error");

      }
      setInputs({
        nombre:"",
        email:"",
        lugarname:"",
        password:"",
        repeatpassword:"",
      });

      setFormValid({
        nombre:false,
        lugarname:false,
        email:false,
        password:false,
        repeatpassword:false
      });
  }


  return (
    <>
     <h2 className="register-form-title">Deja que te conozcan miles de clientes de una forma mas practica</h2>
     <Form className="register-form" onChange={changeForm} onSubmit={register}>
         <Form.Input
         type="text"
         placeholder="Nombre y apellidos"
         name="nombre"
         onChange={inputValidation}
         value={inputs.nombre}
         />
         <Form.Input
         type="text"
         placeholder="Escribe un nombre de usuario"
         name="lugarname"
         onChange={inputValidation}
         value={inputs.lugarname}
         />
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
         <Form.Input
         type="password"
         placeholder="Repetir Contraseña"
         name="repeatpassword"
         onChange={inputValidation}
         value={inputs.repeatpassword}
         />
         <Button type="submit" className="btn-submit">Registrarse</Button>
     </Form>
     <h5 className="politica">Al registrarte aceptas la <span>politica de privacidad</span> </h5>
    </>
  )
}

