import React from "react";
import { Image, StyleSheet } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = () => {
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
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
  logo: {
    height: 80,
    width: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  error: {
    color: "red",
  },
});

export default LoginScreen;
