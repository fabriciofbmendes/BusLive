import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View as Drop, Text } from "react-native";
import styles from "./SearchBar";

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Drop style={styles.container}>
      <Text >Select an option</Text>
      <Picker  selectedValue={selectedValue} onValueChange={handleChange}>
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
      </Drop>
  );
};

export default Dropdown;
