import React from "react";
import Typewriter from "typewriter-effect";

const PlaceholderAnimation = ({ title }: any) => {
  return (
    <Typewriter
      options={{
        strings: title,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default PlaceholderAnimation;
