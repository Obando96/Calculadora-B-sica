import "./App.css";
import borrar from "../public/borrar.png";
import { useEffect, useRef, useState } from "react";

function App() {
  const [showNumber, setShowNumber] = useState(0);
  const [operaciones, setOperaciones] = useState();
  const [result, setResult] = useState();

  const refOperation = useRef(null);

  const WriteNumber = (e) => {
    const keytext = e.target.textContent;
    console.log(keytext);
    if (keytext === "0" && showNumber === 0) {
      return null;
    }
    const number = showNumber + keytext;
    const numberReal = number.replace(/^(0+)/g, "");
    setShowNumber(numberReal);
  };

  const Delete = () => {
    if (showNumber === 0) {
      return null;
    }
    const showNumberDelete = showNumber.toString();
    const newNumber = showNumberDelete.slice(0, showNumberDelete.length - 1);
    setShowNumber(newNumber);
    if(showNumber.length === 1) {
      console.log("Hola")
      setShowNumber(0)
      setResult("")
    }
  };

  const DeleteAll = () => {
    setResult("")
    setShowNumber(0)
  }

  const eliminarUltimoOperador = (expresion) => {
    const operadores = ['+', '-', '*', '/'];
    if (operadores.includes(expresion[expresion.length - 1])) {
      return expresion.slice(0, -1);
    }
    return expresion;
  }
  
  const Operation = () => {
    if(showNumber === 0){
      console.log("Hola2")
      return setResult("")
    }
    const expresion = refOperation.current.textContent
    const expretion = eliminarUltimoOperador(expresion);
    const operation = eval(expretion)
    setResult(operation)
    console.log(expretion);
  }
  

  return (
    <>
      <div className="titileCalculator">Basic Calculator</div>
      <div className="calculator">
        <div>
          <div
            onChange={Operation}
            ref={refOperation}
            className="calculator__display"
          >
            {showNumber}
          </div>
          <div className="totalOperation">{result}</div>
        </div>

        <div className="calculator__keys">
          <div>
            <div className="keys__delete">
              <div onClick={DeleteAll}>C</div>
              <div onClick={WriteNumber}>%</div>
              <div onClick={Delete} id="delete_btn" className="btn_delete">
                <img src={borrar} alt="" />
              </div>
            </div>
            <div onClick={WriteNumber} className="keys__numbers">
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>00</div>
              <div>0</div>
              <div>.</div>
            </div>
          </div>
          <div className="keys__operations">
            <div onClick={WriteNumber}>/</div>
            <div onClick={WriteNumber}>*</div>
            <div onClick={WriteNumber}>-</div>
            <div onClick={WriteNumber}>+</div>
            <div onClick={Operation}>=</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
