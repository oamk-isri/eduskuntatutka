import React from "react";
import { Text, StyleSheet } from "react-native";

export default Heading = ({ children, size, style }) => {
  const getSize = (size) => {
    switch (size) {
      case "h1":
        return 32;
      case "h2":
        return 24;
      case "h3":
        return 18;
      default:
        return 16;
    }
  };
  const headingStyles = StyleSheet.create({
    [size]: {
      fontSize: getSize(size),
      fontWeight: "bold",
      // marginBottom: 10,
      marginTop: 20,
      marginLeft: 30,
    },
  });

  return <Text style={[headingStyles[size], style]}>{children}</Text>;
};
