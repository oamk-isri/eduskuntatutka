import { useState } from "react";
import { parse } from "fast-xml-parser";

export const GetRssFeed = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  const getData = async (path) => {
    setIsLoading(true);

    try {
      const response = await fetch(path);

      if (!response.ok) {
        console.error("Network response error");
      }

      const textResponse = await response.text();
      const result = parse(textResponse);
      const items = result.rss.channel.item;
      setData([...items]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { getData, data, isLoading, error };
};
