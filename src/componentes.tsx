import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./SearchBar";

export interface DropdownOptionsProps {
  selectedOption: string | undefined;
  onValueChange: (value: string) => void;
}
  const combined={
    ...styles.content,
    ...styles.label,
    ...styles.center
  }
  const cor={
    ...styles.labeloption,
    ...styles.label,
  }

  const options : [string,string][] = [
    ['Morada do Sol',"123"], 
    ['Pinheirinho',"1234"], 
    ["Campus","12345"],
  ];

  const Dropdown: React.FC<DropdownOptionsProps> = ({
    selectedOption,
    onValueChange,
  }) => {
  return (
    <Picker
    selectedValue={selectedOption}
    onValueChange={(value) => onValueChange(value)}>
      {options.map((option) => (
        <Picker.Item label={option[0]} value={option[1]} key={option[1]} />
      ))}
    </Picker>
  );
}
export default Dropdown;
