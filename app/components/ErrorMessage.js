import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";

const ErrorMessage = ({ error }) => (
  <AppText style={styles.error}>{error}</AppText>
);

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorMessage;
