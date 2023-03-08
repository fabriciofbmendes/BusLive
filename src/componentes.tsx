import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View as Drop, Text } from "react-native";
import styles from "./SearchBar";

const Dropdown = () => {
  const [selectedValue="Selecione uma rota", setSelectedValue] = useState("");

  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Drop style={styles.container}>
      <Text >Select an option</Text>
      <Picker  style={styles.option_container} selectedValue={selectedValue} onValueChange={handleChange}>
        <Picker.Item style={styles.option_container} label="Morada do Sol" value="option1" />
        <Picker.Item style={styles.option_container} label="Jardim Alvorada" value="option2" />
        <Picker.Item style={styles.option_container} label="Vista Grande" value="option3" />
      </Picker>
      </Drop>
  );
};

export default Dropdown;
