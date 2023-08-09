import React, { useEffect, useState, useRef, useCallback } from "react";
import { Pressable,Alert, Linking, Text, View, Modal } from "react-native";
import Dropdown, { DropdownOptionsProps } from "./componentes"
import reload from "./Main";
import { useTimeout } from './useTimeout';
import VehicleLocationService from './VehicleLocationService';
import Statusbar from "./componentes/statusbar";
import {getVehicleLocation} from "../src/TCC/BusApi";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
  LatLng, 
  MapPressEvent
} from "react-native-maps";
import { RectButton, TextInput } from "react-native-gesture-handler";
import { LocationObject } from "expo-location";
import styles from "../src/styles";
import stylinho from "../src/SearchBar"
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

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

let initialPoint = {
  coords:{
    latitude: -21.425300,
    longitude: -45.949712,
  }
}

export default function App() {
  //#region constantes
const mapViewRef = useRef<MapView>(null);
const [Busmarkers, setBusMarkers] = useState<LatLng[]>([]);
const [UserMarkers, setUserMarkers] = useState<LatLng[]>([]);
const [region, setRegion] = useState<Region>();
const [showAlert, setShowAlert] = useState(false);
const [selectedOption, setSelectedOption] = useState<string>();
const [vehicleLocation, setVehicleLocation] = useState<any| null>(null);
const [location, setLocation] = useState<LocationObject | null>(null);
//#endregion

const clearMarkers = () => {
  setUserMarkers([]);
  setBusMarkers([]);
};

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }


    if(status == "granted"){  
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 });
    } 
  };

  getCurrentPosition();
  // const MapScreen = ({ vehicleId}) => {
  //   const [vehicleLocation, setVehicleLocation] = useState(null);
  
  //   useEffect(() => {
  //     const fetchVehicleLocation = async () => {
  //       const location = await VehicleLocationService.getVehicleLocation(vehicleId);
  //       setVehicleLocation(location);
  //     };
  
  //     fetchVehicleLocation();
  //     // Você pode ajustar o intervalo de atualização de acordo com suas necessidades
  //     const intervalId = setInterval(fetchVehicleLocation, 5000);
  
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, [vehicleId]);


  const handleValueChange = useCallback<DropdownOptionsProps["onValueChange"]>(
    async (value :string) => {
      setSelectedOption(value);
      await setShowAlert(true);
    },
    [selectedOption]
  );

    const attBus = useCallback(
      () => {
        clearMarkers();
        let {
          coords: { latitude, longitude }
        } = initialPoint;

        if (!(vehicleLocation === null)) {
          latitude = parseFloat(vehicleLocation.latitude);
          longitude = parseFloat(vehicleLocation.longitude);
        }

        let busmarker = {
          latitude,
          longitude
        };
        setBusMarkers([busmarker]);
      },
      [vehicleLocation]  
  );


    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      if (showAlert) {
        setShowAlert(true);

        timeoutId = setTimeout(() => {
          setShowAlert(false); 
        }, 6000);
      }
      attBus();
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [showAlert]);



   useEffect(() => {
     const intervalId = setInterval(async () => {
       const newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
    }, 3000);

     return () => clearInterval(intervalId);
   }, []);

   useEffect(() => {
      const intervalId = setInterval(async () => {
      const vehicleId = selectedOption; 
      const newLocation = JSON.stringify(await getVehicleLocation(vehicleId));
      if(!(newLocation===undefined || newLocation==JSON.stringify(vehicleLocation))){
        await setVehicleLocation(JSON.parse(newLocation));
        await attBus();
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [selectedOption,vehicleLocation]);

  return (
    <View style={stylinho.content}>
      <Statusbar/>
      <Dropdown selectedOption={selectedOption} onValueChange={handleValueChange}/>
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
          pinColor="Red"
            key={guidGenerator()}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
      </MapView>
      <Modal visible={showAlert} onRequestClose={() => {}}>
         <Text>Estamos buscando a informação do seu ônibus</Text>
       </Modal>
      {/* <StatusBar hidden={true}/> */}
      
    </View>
  )}
