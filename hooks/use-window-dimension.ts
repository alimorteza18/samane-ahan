import { useState, useEffect } from "react";

const breakpoints = {
  xs: 0, // X-Small devices (portrait phones, less than 576px) (this is the default in Bootstrap)
  sm: 576, // Small devices (landscape phones, 576px and up)
  md: 768, // Medium devices (tablets, 768px and up)
  lg: 992, // Large devices (desktops, 992px and up)
  xl: 1200, // X-Large devices (large desktops, 1200px and up)
  xxl: 1400, // XX-Large devices (larger desktops, 1400px and up)
};

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  } else {
    return { width: 0, height: 0 };
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1500,
    height: 500,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...windowDimensions,
    isMobile: windowDimensions.width <= breakpoints.sm,
    isTablet: windowDimensions.width <= breakpoints.md,
    isDesktop: windowDimensions.width <= breakpoints.lg,
  };
}

export { breakpoints };
