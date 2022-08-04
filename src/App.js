import React, { Fragment, useEffect, useState, useRef } from 'react';

function Solution() {

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [timeRemaining, setTimeRemainig] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(null);
  const [paused, setPaused] = useState(false);
  const [resume, setResume] = useState(false);
  const [pausedAtSeconds, setPausedAtSeconds] = useState(0);
  let secondsRemaining = useRef(0);

  const handleMintuesChange = (event) => {
    setMinutes(event.target.value);

    return;
  }

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);

    return;
  }

  const handleStartClock = () => {
    secondsRemaining.current = (+minutes * 60) + +seconds;
    setStartSeconds(secondsRemaining.current);
    setTimeRemainig(new Date(secondsRemaining.current * 1000).toISOString().substring(14, 19));
    const interval = setInterval(() => {
      setCurrentInterval(interval);
      if (secondsRemaining.current === 0) {
        return () => clearInterval(interval);
      }
      secondsRemaining.current = secondsRemaining.current - 1;
      setTimeRemainig(new Date(secondsRemaining.current * 1000).toISOString().substring(14, 19));
    }, 1000);

    return;
  };

  const handlePauseResume = () => {
    if (!paused) {
      clearInterval(currentInterval);
      setPaused(true);
      return;
    }

    if (paused) {
      const interval = setInterval(() => {
        setCurrentInterval(interval);
        if (secondsRemaining.current === 0) {
          return () => clearInterval(interval);
        }
        secondsRemaining.current = secondsRemaining.current - 1;
        setTimeRemainig(new Date(secondsRemaining.current * 1000).toISOString().substring(14, 19));
      }, 1000);
      setPaused(false);
      return;
    }
  }

  const handleReset = () => {
    secondsRemaining.current = startSeconds;
    setTimeRemainig(new Date(secondsRemaining.current * 1000).toISOString().substring(14, 19));
    clearInterval(currentInterval);
    const interval = setInterval(() => {
      setCurrentInterval(interval);
      if (secondsRemaining.current === 0) {
        return () => clearInterval(interval);
      }
      secondsRemaining.current = secondsRemaining.current - 1;
      setTimeRemainig(new Date(secondsRemaining.current * 1000).toISOString().substring(14, 19));
    }, 1000);

    return;
  }

  return (
    <Fragment>
      <label>
        <input type="number" onChange={handleMintuesChange} />
        Minutes
      </label>
      <label>
        <input type="number" onChange={handleSecondsChange} />
        Seconds
      </label>

      <button onClick={handleStartClock}>START</button>
      <button onClick={handlePauseResume}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">{timeRemaining}</h1>
    </Fragment>
  );
}

export default Solution;
