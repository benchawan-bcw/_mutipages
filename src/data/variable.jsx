import { useState } from "react";
function Variable({ type, name, value, setValue }) {
  return (
    <div className="counter-container">
      <h3 className="title">{name || "Counter"}</h3>

      <button className="btn btn-danger" onClick={() => setValue(value - 1)}>
        &minus;
      </button>&nbsp;

      <span className="value">
        {type && type === "int" ? value : value.toFixed(2)}
      </span>

      &nbsp;<button className="btn btn-success" onClick={() => setValue(value + 1)}>
        +
      </button>
    </div>
  );
}
export default Variable;
