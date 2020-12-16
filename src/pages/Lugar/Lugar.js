import React, {useState, useEffect} from 'react';
import Profile from '../../Components/Profile';
import {getAccessToken} from "../../api/auth";
import {getLugarDataApi} from '../../api/lugar';
import './Lugar.scss';
import useAuth from '../../hooks/useAuth';


export default function Lugar() {
  const [reloadUser, setReloadUser] = useState(false);
const {user} = useAuth();
const {lugar} = user;
const {id} = lugar;
//const {id} = user;
const [userData, setUserData] = useState([])
const token = getAccessToken();
 
  const {lugarData} = userData;


  useEffect(() => {
    getLugarDataApi(token, id).then(response =>{
      setUserData(response);
    });
    setReloadUser(false);
  }, [token, id, reloadUser])
  return (
    <div className="usuario">
      <Profile user={lugarData} setReloadUser={setReloadUser} />
    </div>
  )
}
