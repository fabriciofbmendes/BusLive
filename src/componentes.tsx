import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./SearchBar";

const Dropdown = () => {
  const [selectedValue="Selecione uma rota", setSelectedValue] = useState("");

  const handleChange = (event:any) => {
    setSelectedValue(event);
    console.warn(event)
  };

  const combined={
    ...styles.content,
    ...styles.label,
    ...styles.center
  }
  const cor={
    ...styles.labeloption,
    ...styles.label,
  }

  return (
    <View style={styles.main}>
        <Picker  style={combined} selectedValue={selectedValue} onValueChange={handleChange}>
          <Picker.Item style={cor}  label="Selecione uma rota" />
          <Picker.Item style={styles.labeloption}  label="Morada do Sol" value="1" />
          <Picker.Item style={styles.labeloption}  label="Jardim Alvorada" value="2" />
          <Picker.Item style={styles.labeloption}  label="Vista Grande" value="3" />
        </Picker>
      </View>
  //); */
)};

export default Dropdown;
