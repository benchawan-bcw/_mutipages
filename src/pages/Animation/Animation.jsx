import { useEffect, useState } from "react";
import "./animation.css";

function Animation() {
  const [running, setRunning] = useState(false);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState("none");
  const [rtdeg, setRtdeg] = useState(0);
  const type = [
    "none",
    "basketball",
    "football",
    "voleyball",
    "human",
    "cartoon",
    "logo",
  ];

  const fieldWidth = 700;
  const fieldHeight = 500;
  const diameter = 90;

  const maxLeft = fieldWidth - diameter - 2;
  const maxTop = fieldHeight - diameter - 2;
  const vx = 5;
  const vy = 5;

  const toggleRun = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  const toggleType = (type) => {
    setActive((prevType) => (prevType === type ? "none" : type));
  };

  const calculate = () => {
    if (!running) return;

    setPosition((prevPosition) => {
      let newX = prevPosition.x + (goRight ? vx : -vx);
      let newY = prevPosition.y + (goDown ? vy : -vy);
      if (newX >= maxLeft || newX <= 0) {
        setGoRight(prev => !prev);
        newX = Math.max(0, Math.min(newX, maxLeft));
      }
      if (newY >= maxTop || newY <= 0) {
        setGoDown(prev => !prev);
        newY = Math.max(0, Math.min(newY, maxTop));
      }setRtdeg((prevRtdeg) => (prevRtdeg + 10) % 360);
      return { x: newX, y: newY };
    });
  };
  

  const handleKeyDown = (event) => {
    const typeMap = {
      " ": toggleRun,
      0: () => toggleType("none"),
      1: () => toggleType("basketball"),
      2: () => toggleType("football"),
      3: () => toggleType("voleyball"),
      4: () => toggleType("human"),
      5: () => toggleType("cartoon"),
      6: () => toggleType("logo"),
    };
    if (typeMap[event.key]) {
      typeMap[event.key]();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculate();
      }
    }, 30);
    return () => clearInterval(interval);
  }, [goRight, goDown, running]);

  return (
    <div className="animation-container">
      <div
        className="animation-field"
        id="field"
        style={{
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
          position: "relative",
        }}
      >
        <div className={`ball ${active}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${diameter}px`,
            height: `${diameter}px`,
            position: "absolute",
            transform: `rotate(${rtdeg}deg)`
          }}
        ></div>
      </div>

      <div id="control" className="control-btn">
        <button
          id="run"
          className={`btn ${running ? "btn-danger" : "btn-primary"}`}
          onClick={toggleRun}
        >
          {running ? (
            <span className="bi bi-pause-fill">Pause</span>
          ) : (
            <span className="bi bi-play-fill">Run</span>
          )}
        </button>
        <button
          id="nne"
          className="btn btn-warning"
          onClick={() => toggleType("none")}>
          None
        </button>

        <button
          id="bskt"
          className="btn btn-secondary"
          onClick={() => toggleType("basketball")}>
          Basketball
        </button>

        <button
          id="fbt"
          className="btn btn-secondary"
          onClick={() => toggleType("football")}>
          Football
        </button>

        <button
          id="vlb"
          className="btn btn-secondary"
          onClick={() => toggleType("voleyball")}>
          Voleyball
        </button>

        <button
          id="hum"
          className="btn btn-secondary"
          onClick={() => toggleType("human")}>
          Human
        </button>

        <button
          id="ctn"
          className="btn btn-secondary"
          onClick={() => toggleType("cartoon")}>
          Cartoon
        </button>

        <button
          id="lgo"
          className="btn btn-secondary"
          onClick={() => toggleType("logo")}>
          Logo
        </button>
        
      </div>
    </div>
  );
}

export default Animation;
