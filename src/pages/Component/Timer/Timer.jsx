import { useEffect, useState } from "react";
import "./Timer.css";

function Timer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }
    return ()=> clearInterval(interval)
  }, [running, seconds]);

  function runClick() {
    setRunning(!running);
  }

  function resetClick() {
    setRunning(false);
    setSeconds(0);
  }

  function secondsToString(seconds) {
    const minute_seconds = 60;
    const hour_seconds = 60 * minute_seconds;
    const day_seconds = 24 * hour_seconds;

    const days = Math.floor(seconds / day_seconds);
    const hours = Math.floor((seconds % day_seconds) / hour_seconds);
    const minutes = Math.floor((seconds % hour_seconds) / minute_seconds);
    const secs = seconds % minute_seconds;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  return (
    <div className="timer-container">
      <h3 className="timer-title">TIMER</h3>
      <p>
        <input
          className="timer-display"
          type="text"
          value={secondsToString(seconds)}
          readOnly={true}
        />
      </p>
      <div className="timer-buttons">
        <button className="btn btn-danger" onClick={resetClick}>
          Reset
        </button>
        <button
          className={"btn " + (running ? "btn-warning" : "btn-success")}
          onClick={runClick}
        >
          {running ? "Pause" : "Run"}
        </button>
      </div>
    </div>
  );
}

export default Timer;
