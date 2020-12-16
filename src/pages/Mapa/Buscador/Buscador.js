import React, {Component} from 'react';
import {Input, Button} from 'antd'
import { OpenStreetMapProvider } from 'react-leaflet-geosearch'
import {map} from 'leaflet'
import './Mapa.scss';

class  Buscador extends Component {

  state={
    direccion:""
  }
  onchange= async e=>{
    this.setState({ direccion: e.target.value})
  }
  render(){
    const{direccion} = this.state;
     
    if(direccion.length >8) {
      const provider = new OpenStreetMapProvider();
      provider.search({query: direccion}).then((res) =>{
        //mostrar el mapa
        map.setView(res[0].bounds[0],15)

      })
    }
   
  return (
    
    <div className="map-page">
      <h1>Ubica la dirección de tu negocio</h1> 
      <p className="buscador">
        <Input 
        placeholder="Dirección : Plaza de la Constitución S/N, Centro Histórico de la Cdad. de México"
        name="direccion"
        value={this.state.direccion}
        onChange={this.onchange}
        ></Input><Button>ENVIAR</Button></p>
    </div>
  )
  }
}

export default Buscador