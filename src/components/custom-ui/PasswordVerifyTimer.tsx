import React, { useEffect } from "react";

interface CountdownTimerProps {
  time: {
    minutes: number;
    seconds: number;
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      minutes: number;
      seconds: number;
    }>
  >;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ time, setTime }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (time.seconds > 0) {
        setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
      } else if (time.minutes > 0) {
        setTime({ minutes: time.minutes - 1, seconds: 59 });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, setTime]);

  return (
    <>
      <span>
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </span>
    </>
  );
};

export default CountdownTimer;
