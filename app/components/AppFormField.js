import React from "react";
import { StyleSheet } from "react-native";

import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";

import { useForm, Controller } from "react-hook-form";

const AppFormField = ({ name, onSubmit, ...otherProps }) => {
  const { control, errors } = useForm();
  return (
    <>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <AppTextInput
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value}
            {...otherProps}
          />
        )}
        name="email"
        defaultValue=""
      />
      <AppText style={styles.error}>{errors[name]?.message}</AppText>
    </>
  );
};

const styles = StyleSheet.create({});

export default AppFormField;
