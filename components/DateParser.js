import React from "react";
import { View, Text } from "react-native";
import { format } from "date-fns";
import fi from "date-fns/locale/fi"; // Finnish locale
import { StyleSheet } from "react-native";

const DateWithFinnishWeekday = ({ dateString }) => {
  const parsedDate = parseDateStringToNumber(dateString);

  if (!parsedDate) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{parsedDate.date}</Text>
      <Text style={styles.weekday}>{parsedDate.weekday}</Text>
    </View>
  );
};

const parseDateStringToNumber = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return null;
  }

  const formattedDate = format(date, "dd.M", { locale: fi });

  const parsefinnishWeekday = format(date, "EEEE", { locale: fi });
  const finnishWeekday = parsefinnishWeekday.slice(0, -2);

  return {
    date: formattedDate,
    weekday: finnishWeekday,
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 0.3,
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weekday: {
    fontSize: 16,
    color: "#888",
  },
});

export default DateWithFinnishWeekday;
