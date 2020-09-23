import React from "react";
import { StyleSheet } from "react-native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(7).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const RegisterScreen = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Screen>
      <Controller
        control={control}
        render={({ onBlur, onChange, value }) => (
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            onBlur={onBlur}
            onChangeText={(name) => onChange(name)}
            placeholder="Name"
            value={value}
          />
        )}
        name="name"
        defaultValue=""
      />
      <AppText style={styles.error}>{errors.name?.message}</AppText>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={(email) => onChange(email)}
            placeholder="Email"
            textContentType="emailAddress"
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      <AppText style={styles.error}>{errors.email?.message}</AppText>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            onBlur={onBlur}
            onChangeText={(pass) => onChange(pass)}
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            value={value}
          />
        )}
        name="password"
        defaultValue=""
      />
      <AppText style={styles.error}>{errors.password?.message}</AppText>
      <AppButton title="Login" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  error: {
    color: "red",
  },
});

export default RegisterScreen;
