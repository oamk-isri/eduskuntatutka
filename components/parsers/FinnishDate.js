import { View, Text } from "react-native";
import { format } from "date-fns";
import fi from "date-fns/locale/fi";
import styles from "../../styles/components/parsers"

export default FinnishDate = ({ dateString }) => {
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