import "./App.css";
import { useState } from "react";

function App() {
  const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const basicArray = ["+", "-", "*", "/", "%"];
  const intermediateArray = ["^", "log", "lg", "ln", "exp", "mod", "factorial"];
  const complexArray = ["sin", "cos", "tan", "ctg"];
  const partialArray = ["1/x", ".", "neg", "="];
  const [inputValue, setInputValue] = useState('');
  const [memo, setMemo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [baseOperation, setBaseOperation] = useState("");
  const regex = /[0-9]/gi;

  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
  }

  const calculate = (state) => {
    // console.log(`Number value is: ${String(inputValue) + state}`);
    // let useVar = showInput ? memo : inputValue;

    showInput ? setMemo(state) : setInputValue(state);
    // showInput ? setMemo(Number(String(useVar) + state)) : setInputValue(Number(String(useVar) + state));
    // showInput ? setMemo(Number(String(memo) + state)) : setInputValue(Number(String(inputValue) + state));
  };

  const basicOperation = (state) => {
    switch (state) {
      case "+":
        setBaseOperation("+")
        setMemo(inputValue)
        setShowInput(true);
        // setInputValue('');
        console.log("sum");
        break;
      case "-":
        setBaseOperation("-")
        setMemo(inputValue)
        console.log("substraction");
        break;
      case "*":
        setBaseOperation("*")
        setMemo(inputValue)
        console.log("multiplication");
        break;
      case "/":
        setBaseOperation("/")
        setMemo(inputValue)
        console.log("divide");
        break;
      case "%":
        setBaseOperation("%")
        setMemo(inputValue)
        console.log("divide with rest");
        break;
      default:
        console.log(`Select an option.`);
    }
  }

  const partialOperation = (state) => {
    let newVar;
    switch (state) {
      case "1/x":
        console.log("inverse");
        break;
      case ".":
        console.log("digit");
        break;
      case "neg":
        console.log("negation");
        break;
      case "=":
        // setMemo(inputValue)
        newVar = baseOperation ? operations[baseOperation](Number(memo), Number(inputValue)) : newVar;
        console.log("equal");
        setInputValue(newVar);
        setShowInput(false);
        break;
      default:
        console.log(`Select an option.`);
    }
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    const matches = value.match(regex);
    const newInputValue = matches ? matches.join('') : '';
    showInput ? setMemo(newInputValue) : setInputValue(newInputValue);
  };

  const handleMemo = () => {

  }

  return (
    <div className="App">
      <header>
        <h1>WebCalculator</h1>
      </header>
      <main>
        <section>
          <div>
            <input type="text" onChange={handleMemo} />
          </div>
          <div>
            <input type="text" onChange={handleInputChange} value={showInput ? memo : inputValue} />
          </div>
          <div>
            {numberArray.map((number) => (
              <button key={number} onClick={() => calculate(number)}>{number}</button>
            ))}
          </div>
          <div>
            {basicArray.map((base_op) => (
              <button key={base_op} onClick={() => basicOperation(base_op)}>{base_op}</button>
            ))}
          </div>
          <div>
            {intermediateArray.map((inter_op) => (
              <button key={inter_op} onClick={() => calculate(inter_op)}>{inter_op}</button>
            ))}
          </div>
          <div>
            {complexArray.map((complex_op) => (
              <button key={complex_op} onClick={() => calculate(complex_op)}>{complex_op}</button>
            ))}
          </div>
          <div>
            {partialArray.map((partial_op) => (
              <button key={partial_op} onClick={() => partialOperation(partial_op)}>{partial_op}</button>
            ))}
          </div>
        </section>
      </main>
      <footer />
    </div>
  );
}

export default App;
