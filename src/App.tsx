import React, { useEffect, useState,useRef } from "react";
import { Pressable,Alert, Linking, Text, View } from "react-native";
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

function guidGenerator(){
  var S4 = function(){
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

interface Bus{
  IsActive : boolean;
  latitude: number;
  longitude: number;
  buskey : any;
}

const initialRegion = {
  latitude: -21.425300,
  longitude: -45.949712,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};


export default function App() {
  //#region constantes
  const mapViewRef = useRef<MapView>(null);

  const [Busmarkers, setBusMarkers] = useState<LatLng[]>([]);
  const [UserMarkers, setUserMarkers] = useState<LatLng[]>([]);
  
  const clearMarkers = () => {
      setUserMarkers([]);
      while(Busmarkers.length){
        Busmarkers.pop();
        setBusMarkers([]);
      }
  };

  const [region, setRegion] = useState<Region>();

  const [Bus, setBus] = useState<Bus[]>([]);
//#endregion

  const getCurrentPosition = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync()

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 });

    if(status == "granted"){  

      let marker = {
         latitude
         ,longitude
       }

      clearMarkers();
      setUserMarkers([marker]);
      setBus([...Bus]);
      Bus.forEach(function(bus){
        let latitude = bus.latitude
        let longitude = bus.longitude;
        let busmarker = {
          latitude,
          longitude
        }
        Busmarkers.push(busmarker)
      })

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

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
        region={region}
        initialRegion={initialRegion}
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
            pinColor="green"
            key={guidGenerator()}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}