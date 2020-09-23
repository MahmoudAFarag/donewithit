import React from "react";
import { StyleSheet, Keyboard, View } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { Picker } from "@react-native-community/picker";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";

const Categories = [
  { name: "Furniture", id: "1" },
  { name: "Clothing", id: "2" },
  { name: "Camera", id: "3" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(2).label("Title"),
  price: Yup.number()
    .required()
    .min(1)
    .max(10000)
    .label("Price")
    .typeError("Enter a valid number between 1 and 10,000"),
});

const ListingEditScreen = () => {
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => console.log(data);
  return (
    <Screen style={styles.container}>
      <Controller
        control={control}
        render={({ onBlur, onChange, value }) => (
          <AppTextInput
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={(title) => onChange(title)}
            placeholder="Title"
            value={value}
          />
        )}
        name="title"
        defaultValue=""
      />
      <AppText style={styles.error}>{errors.title?.message}</AppText>
      <Controller
        control={control}
        render={({ onBlur, onChange, value }) => (
          <AppTextInput
            autoCorrect={false}
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={(price) => onChange(price)}
            placeholder="Price"
            value={value}
          />
        )}
        name="price"
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ onBlur, onChange, value }) => (
          <Picker
            selectedValue="Test 1"
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        )}
        name="picker"
        defaultValue=""
      />

      <AppText style={styles.error}>{errors.price?.message}</AppText>
      <AppButton title="Post" onPress={handleSubmit(onSubmit)} />

      <View style={styles.outZone} onTouchStart={Keyboard.dismiss}></View>
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
  outZone: {
    width: "100%",
    height: 130,
  },
});

export default ListingEditScreen;
