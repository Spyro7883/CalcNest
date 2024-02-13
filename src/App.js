import "./App.css";
import { useState } from "react";

function App() {
  const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const basicArray = ["+", "-", "*", "/", "%"];
  const intermediateArray = ["^", "log", "lg", "ln", "exp", "mod", "factorial"];
  const complexArray = ["sin", "cos", "tan", "ctg"];
  const partialArray = ["1/x", ".", "neg", "="];
  const [inputValue, setInputValue] = useState('');
  const reg = /[0-9]/gi;

  const selectOperation = (state) => {
    setInputValue(state);
    console.log(inputValue)
  };

  const addNumber = (value) => (e) => {
    value = e.target.value;
    setInputValue(value);
  };

  const handleInputChange = (e) => {
    // let newInputValue = inputValue;
    // newInputValue = e.target.value.match(reg);
    // if (newInputValue)
    // setInputValue(newInputValue);
    let newInputValue = inputValue;
    newInputValue = e.target.value;
    setInputValue(newInputValue)
  };

  return (
    <div className="App">
      <header>
        <h1>WebCalculator</h1>
      </header>
      <main>
        <section>
          <input type="text" onChange={handleInputChange} value={inputValue} />
          <div>
            {numberArray.map((number) => (
              <button key={number} onClick={() => selectOperation(number)}>{number}</button>
            ))}
          </div>
          <div>
            {basicArray.map((base_op) => (
              <button key={base_op} onClick={() => selectOperation(base_op)}>{base_op}</button>
            ))}
          </div>
          <div>
            {intermediateArray.map((inter_op) => (
              <button key={inter_op} onClick={() => selectOperation(inter_op)}>{inter_op}</button>
            ))}
          </div>
          <div>
            {complexArray.map((complex_op) => (
              <button key={complex_op} onClick={() => selectOperation(complex_op)}>{complex_op}</button>
            ))}
          </div>
          <div>
            {partialArray.map((partial_op) => (
              <button key={partial_op} onClick={() => selectOperation(partial_op)}>{partial_op}</button>
            ))}
          </div>
        </section>
      </main>
      <footer />
    </div>
  );
}

export default App;
