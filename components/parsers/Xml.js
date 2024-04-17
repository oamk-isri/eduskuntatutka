import { useState } from "react";
import { parse } from "fast-xml-parser";

export default Xml = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  const getData = async (path) => {
    setIsLoading(true);

    try {
      const response = await fetch(path);

      if (!response.ok) {
        console.error("Network response error");
        throw new Error("Network response error");
      }

      const textResponse = await response.text();
      const result = parse(textResponse);

      let items;
      if (Array.isArray(result.rss.channel.item)) {
        items = result.rss.channel.item.flat();
      } else {
        items = [result.rss.channel.item];
      }

      setData([...items]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { getData, data, isLoading, error };
};
