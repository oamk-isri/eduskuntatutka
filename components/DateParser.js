import { View, Text } from "react-native";
import { format } from "date-fns";
import fi from "date-fns/locale/fi";
import { StyleSheet } from "react-native";

const DateWithFinnishWeekday = ({ dateString }) => {
  const parsedDate = parseDateStringToNumber(dateString);

  if (!parsedDate) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{parsedDate.date}</Text>
      <Text style={styles.year}>{parsedDate.year}</Text>
      <Text style={styles.weekday}>{parsedDate.weekday}</Text>
    </View>
  );
};

const parseDateStringToNumber = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return null;
  }

  const formattedDate = format(date, "dd", { locale: fi });
  const dateToDisplay = formattedDate.startsWith("0")
    ? formattedDate.slice(1)
    : formattedDate;
  const finalFormattedDate = format(date, `${dateToDisplay}.M`, { locale: fi });

  const year = format(date, "yyyy", { locale: fi });

  const parsefinnishWeekday = format(date, "EEEE", { locale: fi });
  const finnishWeekday = parsefinnishWeekday.slice(0, -2);

  return {
    date: finalFormattedDate,
    weekday: finnishWeekday,
    year,
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    //   flex: 0.3,
    paddingRight: 10,
  },
  date: {
    fontSize: 20,
    color: "#114d9d",
    fontWeight: "bold",
  },
  year: {
    fontSize: 10,
    color: "#114d9d",
    marginTop: 2,
  },
  weekday: {
    fontSize: 12,
    color: "#888",
  },
});

export default DateWithFinnishWeekday;
