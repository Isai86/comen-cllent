import React, {useState, useEffect, Component} from 'react';
import {Input, Button} from 'antd'
import { OpenStreetMapProvider, SearchControl, GeoSearchControlElement } from 'react-leaflet-geosearch'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet'
//import 'leaflet/dist/leaflet.css';
import './Mapa.scss';

export default function Mapa() {

const lat = 19.5990297;
const lng = -99.046521;
const [center, setCenter] = useState({lat,lng})
const Zoom = 15;
/* const prov = OpenStreetMapProvider();
const GeoSearchControlElement = withLeaflet(SearchControl);   */
  return (
    <div className="map-page">
      <h1>Ubica la dirección de tu negocio</h1> 
      <Buscador/>
      <MapContainer
      center={center} 
      zoom={Zoom} 
      scrollWheelZoom={false}
      >
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
 {/*  <Marker position={[lat,lng]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
{/*   <GeoSearchControlElement provider={prov} showMarker= {true} showPopup={false} popupFormat={({ query, result }) => result.label} 
                  maxMarkers={3}  retainZoomLevel= {false}  animateZoom= {true} autoClose= {false}  
                  searchLabel={'Enter address, please'} keepResult= {true} /> */}
</MapContainer>
    </div>
  )
}


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
        L.map.setView(res[0].bounds[0],15).getCenter()

      })
    }
   
  return (
    
    <div className="map-page">
      <p className="buscador">
        <Input 
        placeholder="Dirección : Plaza de la Constitución S/N, Centro Histórico de la Cdad. de México"
        name="direccion"
        value={this.state.direccion}
        onChange={this.onchange}
        ></Input><Button>Guardar Dirección</Button></p>
    </div>
  )
  }
}

