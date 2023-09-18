import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type ClockProps = {
  datetime?: string;
};

export default function Clock({ datetime }: ClockProps) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [time, setTime] = useState("00:00");

  const [hourDegree, setHourDegree] = useState(0);
  const [minDegree, setMinDegree] = useState(0);
  const [secDegree, setSecDegree] = useState(0);

  useEffect(() => {
    if (datetime) {
      let devided = datetime.split(" ");
      let time = devided[1];
      let devidedTime = time.split(":");
      setHour(parseInt(devidedTime[0]));
      setMinute(parseInt(devidedTime[1]));
      setSecond(parseInt(devidedTime[2]));
      setTime(hour + ":" + minute);
    }

    let hrPosition = (hour * 360) / 12 + (minute * (360 / 60)) / 12;
    setHourDegree(hrPosition + 3 / 360);

    let minPosition = (minute * 360) / 60 + (second * (360 / 60)) / 60;
    setMinDegree(minPosition + 6 / 60);

    let secPosition = (second * 360) / 60;
    setSecDegree(secPosition + 6);
  }, []);

  return (
    <div className={styles.clockbox} title={time}>
      <svg
        className={styles.clock}
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="200"
        viewBox="0 0 600 600"
      >
        <g id="face">
          <circle className={styles.circle} cx="300" cy="300" r="253.9" />
          <path
            className={styles.hourmarks}
            d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"
          />
          <circle className={styles.midcircle} cx="300" cy="300" r="16.2" />
        </g>
        <g
          className={styles.hour}
          style={{ transform: `rotate(${hourDegree}deg)` }}
        >
          <path className={styles.hourarm} d="M300.5 298V142" />
          <circle className={styles.sizingbox} cx="300" cy="300" r="253.9" />
        </g>
        <g
          className={styles.minute}
          style={{ transform: `rotate(${minDegree}deg)` }}
        >
          <path className={styles.minutearm} d="M300.5 298V67" />
          <circle className={styles.sizingbox} cx="300" cy="300" r="253.9" />
        </g>
      </svg>
    </div>
  );
}
