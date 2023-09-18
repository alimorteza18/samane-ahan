import { useEffect, useState } from "react";
import styles from "./ScrollButton.module.css";

export default function ScrollButton() {
  const [showButton, setShowButton] = useState(false);

  // Add a scroll event listener to the window
  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the middle of the page
      if (
        window.pageYOffset >
        document.body.getBoundingClientRect().height / 2
      ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles.button} ${showButton ? styles.show : ""}`}
      onClick={handleClick}
    >
      <img src="/assets/imgs/icon/top-arrow.svg" alt="" />
    </button>
  );
}
