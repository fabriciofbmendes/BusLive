import React, { useEffect, useState, useRef } from "react";
import { Pressable,Alert, Linking, Text, View } from "react-native";
import Dropdown from "./componentes"
import reload from "./Main";
import { useTimeout } from './useTimeout';

import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
  LatLng, 
  MapPressEvent
} from "react-native-maps";
import { RectButton, TextInput } from "react-native-gesture-handler";
import * as Location from "expo-location";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";

function guidGenerator(){
  var S4 = function(){
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const submit = () => {
  setTimeout(() => {
    console.log("teste2")
}, 5000)
}


interface Bus{
  IsActive : boolean;
  latitude: number;
  longitude: number;
  buskey : any;
}

let initialRegion = {
  latitude: -21.425300,
  longitude: -45.949712,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function App() {
  //#region constantes
const mapViewRef = useRef<MapView>(null);
const [Busmarkers, setBusMarkers] = useState<LatLng[]>([]);
const [UserMarkers, setUserMarkers] = useState<LatLng[]>([]);
const [region, setRegion] = useState<Region>();

//#endregion
  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }
    const clearMarkers = () => {
      setUserMarkers([]);
      setBusMarkers([]);
    };

    if(status == "granted"){  
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 });
      clearMarkers();

      let marker = {
         latitude
         ,longitude
       }
       
      //setUserMarkers([marker]);
      let bool = 1;

      if(bool == 1 ){
        
        latitude = -21.429800
        longitude = -45.949800
  
        let busmarker ={
          latitude,
          longitude
        } 
        
        setRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 });
  
        setBusMarkers([busmarker]);
      }
    } 
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={styles.container}>

      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        region={region}
        showsMyLocationButton={true}
        loadingEnabled={true}
        showsUserLocation={true}
        onUserLocationChange={()=>{}}
        onMapLoaded={submit}
      >
        
      {UserMarkers.map((marker) => (
          <Marker
          pinColor="Red"
            key={guidGenerator()}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
        
    {Busmarkers.map((marker) => (
          <Marker
          tracksViewChanges={true}
            image={require("./imagens/MarkerOnibusFinal.png")}
            key={guidGenerator()}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
      </MapView>
      {/* <StatusBar hidden={true}/> */}
      <Dropdown/>
    </View>
  )}
