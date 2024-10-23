import { useState } from "react";
import "./Counter.css";

function Couter(props) {
  const [value, setValue] = useState(props.value || 0);
  function increment() {
    setValue(value + 1);
  }
  function decrement() {
    setValue(value - 1);
  }

  return (
    <div className="counter-container">
      <h3 className="counter-title">{props.name || "COUNTER"}</h3>
      <button className="btn btn-danger" onClick={decrement}>
        &minus;
      </button>
      &nbsp;
      <span className="counter-value">{value}</span>
      &nbsp;
      <button className="btn btn-success" onClick={increment}>
        +
      </button>
    </div>
  );
}

export default Couter;
