import React, { useContext, useRef, useState } from "react";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import { NewsCategoryContext } from "../contexts/Contexts";
import { RssFeeds } from "../constants/RssFeeds";

const SwipeableList = ({ children }) => {
  const { setSelectedCategory } = useContext(NewsCategoryContext);

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX < -50) {
      setSelectedCategory((prevIndex) =>
        prevIndex === RssFeeds.length - 1 ? 0 : prevIndex + 1
      );
    } else if (nativeEvent.translationX > 50) {
      setSelectedCategory((prevIndex) =>
        prevIndex === 0 ? RssFeeds.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <ScrollView>
      <PanGestureHandler activeOffsetX={[-30, 30]} onGestureEvent={handleSwipe}>
        {children}
      </PanGestureHandler>
    </ScrollView>
  );
};

export default SwipeableList;
