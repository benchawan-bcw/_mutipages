import { useEffect, useState } from "react";
import Variable from "../Variable/Variable.jsx";
import "./Temperatures.css";
function Temperatures() {
  const [celsius, setCelsius] = useState(25);
  const [fahrenheit, setFahrenheit] = useState(77);
  const [kelvin, setKelvin] = useState(298.15);


  useEffect(() => {
    setCelsius((fahrenheit - 32) * (5 / 9)); //fah to cel
    setKelvin((fahrenheit - 32)*(5/9) + 273.15); // fah to kel
  }, [fahrenheit]);

  useEffect(() => {
    setFahrenheit((celsius * (9 / 5)) + 32); //cel to fah
    setKelvin(celsius + 273.15); //cel to kel
  }, [celsius]);

  useEffect(() => {
    setFahrenheit((kelvin - 273.15) * (9 / 5) + 32); //kel to fah
    setCelsius(kelvin - 273.15); //kel to cel
  }, [kelvin]);

  return (
    <div className="temperatures-container">
      <h3 className="temperatures-title">TEMPERATURES</h3>
      <h3 className="temperatures-display">
        <span className="badge bg-primary" >{celsius.toFixed(2)} °C</span>&nbsp;
        <span className="badge bg-primary" >{fahrenheit.toFixed(2)} °F </span>&nbsp;
        <span className="badge bg-primary" >{kelvin.toFixed(2)} K </span>
      </h3>

      <div className="temperatures-variables">
        <Variable name={"CELSIUS"} value={celsius} setValue={setCelsius} />
        <Variable
          name={"FAHRENHEIT"}
          value={fahrenheit}
          setValue={setFahrenheit}
        />
        <Variable name={"KELVIN"} value={kelvin} setValue={setKelvin} />
      </div>
    </div>
  );
}

export default Temperatures;
