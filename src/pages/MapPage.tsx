import {GoogleMap,useJsApiLoader} from "@react-google-maps/api";
import './MapPage.css';
import Logo from "C:/TCC/map/src/images/onibus.svg";
import Barra from "C:/TCC/map/src/images/threebars_106419.svg";
export interface MapPageProps {}



const MapPage = () => {
 const {isLoaded} = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: "AIzaSyBczwD8jCyEjH21_2eh8VZKc8e4qpjQcS0"
 });
 return (
  
 <div className="map">
  <div className="menu ">
    <span><img className="tresbarras" src={Barra} alt="mais"></img></span>
    <span><p>BUSLIVE</p></span>
    <span><img className="onibus" src={Logo} alt=""></img></span>
  </div>
  {isLoaded ? (
    <GoogleMap
      mapContainerStyle={{width: '100%',height: '100%'}}
      center={{
        lat: -21.425175814312578, 
        lng: -45.947708055804455
      }}
      zoom={15}
      ></GoogleMap>
  ) : (
    <></>
  )}
 </div>
 );
};
export default MapPage;
