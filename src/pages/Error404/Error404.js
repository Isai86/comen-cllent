import React from 'react';
import './Error404.scss';
import {Link} from 'react-router-dom';
import {ReactComponent as PortadaNoFount} from '../../assets/svg/browser.svg';

export default function Error404() {
  return (
    <div className="user-not-found">
      <PortadaNoFount/>
      <p>Pagina no Encontrada</p>
      <p>Es posible que el enlace que has seguido sea incorrecto o que el usuario se haya eliminado</p>
      <Link to="/">Volver a la home</Link>
    </div>
  )
}
