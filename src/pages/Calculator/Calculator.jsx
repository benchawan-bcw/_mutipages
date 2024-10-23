import { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [output, setOutput] = useState("");
  const operators = ["+", "-", "/", "x", "%"];

  const calculate = (btnValue) => {
    let newOutput = output;

    if (btnValue === "=" && output !== "") {
      newOutput = eval(output.replace("%", "/100"));
    } else if (btnValue === "AC") {
      newOutput = "";
    } else if (btnValue === "DEL") {
      newOutput = output.toString().slice(0, -1);
    } else {
      if (output === "" && operators.includes(btnValue)) return;
      newOutput += btnValue;
    }
    setOutput(newOutput);
  };

  const checkKeyboard = (event) => {
    const keyMap = {
      Enter: "=",
      Backspace: "DEL",
      Escape: "AC",
      "*": "x",
    };

    if (keyMap[event.key]) {
      event.preventDefault();
      calculate(keyMap[event.key]);
    } else if (
      operators.includes(event.key) ||
      (event.key >= "0" && event.key <= "9") ||
      event.key === "."
    ) {
      calculate(event.key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      checkKeyboard(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="mypage" size="telephone">
      <div id="calculator">
        <input type="text" className="display" value={output} readOnly />

        <div className="buttons">
          <div id="first">
            <button
              data-value="AC"
              className="operator"
              onClick={() => calculate("AC")}
            >
              AC
            </button>
            <button
              data-value="%"
              className="operator"
              onClick={() => calculate("%")}
            >
              %
            </button>
            <button
              data-value="DEL"
              className="operator"
              onClick={() => calculate("DEL")}
            >
              DEL
            </button>
            <button
              data-value="/"
              className="operator"
              onClick={() => calculate("/")}
            >
              ÷
            </button>
          </div>

          <div id="second">
            <button data-value="7" id="num7" onClick={() => calculate("7")}>
              7
            </button>
            <button data-value="8" id="num8" onClick={() => calculate("8")}>
              8
            </button>
            <button data-value="9" id="num9" onClick={() => calculate("9")}>
              9
            </button>
            <button
              data-value="*"
              className="operator"
              onClick={() => calculate("x")}
            >
              x
            </button>
          </div>

          <div id="third">
            <button data-value="4" id="num4" onClick={() => calculate("4")}>
              4
            </button>
            <button data-value="5" id="num5" onClick={() => calculate("5")}>
              5
            </button>
            <button data-value="6" id="num6" onClick={() => calculate("6")}>
              6
            </button>
            <button
              data-value="-"
              className="operator"
              onClick={() => calculate("-")}
            >
              -
            </button>
          </div>

          <div id="fourth">
            <button data-value="1" id="num1" onClick={() => calculate("1")}>
              1
            </button>
            <button data-value="2" id="num2" onClick={() => calculate("2")}>
              2
            </button>
            <button data-value="3" id="num3" onClick={() => calculate("3")}>
              3
            </button>
            <button
              data-value="+"
              className="operator"
              onClick={() => calculate("+")}
            >
              +
            </button>
          </div>

          <div id="fifth">
            <button
              data-value="00"
              id="doublezero"
              onClick={() => calculate("00")}
            >
              00
            </button>
            <button data-value="0" id="num0" onClick={() => calculate("0")}>
              0
            </button>
            <button data-value="." id="dot" onClick={() => calculate(".")}>
              .
            </button>
            <button
              data-value="="
              id="equal"
              className="operator"
              onClick={() => calculate("=")}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
