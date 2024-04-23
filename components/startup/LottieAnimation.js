import { useRef, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import LottieView from "lottie-react-native";

const LOTTIE_JSON = require("../../assets/animation/lottie.json");

export default LottieAnimation = () => {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = () => {
    if (!isPlaying) {
      ref.current?.play();
      setIsPlaying(true);
    }
  };

  const handleAnimationFinish = () => {
    setIsPlaying(false);
  };

  return (
    <Pressable
      style={styles.lottieContainer}
      onPress={handlePress}
      disabled={isPlaying}
    >
      <LottieView
        ref={ref}
        style={{ width: 220, height: 220 }}
        source={LOTTIE_JSON}
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    justifyContent: "center",
    alignSelf: "center",
  },
});
