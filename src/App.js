import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const basicArray = ["+", "-", "*", "/", "%"];
  const partialArray = ["1/x", ".", "neg", "="];
  const [inputValue, setInputValue] = useState('');
  const [memo, setMemo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [baseOperation, setBaseOperation] = useState("");
  const [history, setHistory] = useState("");
  const [stateOperation, setStateOperation] = useState(false);
  const regex = /^\d*\.?\d*/gi;

  const prevInputValueRef = useRef(inputValue);

  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
  }

  const calculate = (state) => {
    // let compoundVar = showInput ? memo : inputValue;
    // if (baseOperation === "") {
    // console.log(`Values: ${Number(String(compoundVar) + String(state))} + ${state} ${compoundVar} + ${state}`)
    // showInput ? setMemo(Number(String(compoundVar) + String(state))) : setInputValue(Number(String(compoundVar) + String(state)));
    // }
    // else
    showInput ? setMemo(state) : setInputValue(state);
  };

  const basicOperation = (state) => {
    switch (state) {
      case "+":
        setBaseOperation("+")
        setMemo(inputValue)
        setShowInput(true);
        setStateOperation(false);
        console.log("sum");
        break;
      case "-":
        setBaseOperation("-")
        setMemo(inputValue)
        setShowInput(true);
        setStateOperation(false)
        console.log("substraction");
        break;
      case "*":
        setBaseOperation("*")
        setMemo(inputValue)
        setShowInput(true);
        setStateOperation(false)
        console.log("multiplication");
        break;
      case "/":
        setBaseOperation("/")
        setMemo(inputValue)
        setShowInput(true);
        setStateOperation(false)
        console.log("divide");
        break;
      case "%":
        setBaseOperation("%")
        setMemo(inputValue)
        setShowInput(true);
        setStateOperation(false)
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
        newVar = showInput ? memo : inputValue;
        console.log("inverse");
        setInputValue(1 / newVar);
        setShowInput(false);
        break;
      case ".":
        newVar = showInput ? memo : inputValue;
        console.log("digit");
        setInputValue((-1) * newVar);
        setShowInput(false);
        break;
      case "neg":
        newVar = showInput ? memo : inputValue;
        console.log("negation");
        setInputValue((-1) * newVar);
        setShowInput(false);
        break;
      case "=":
        setStateOperation(true);
        newVar = baseOperation ? operations[baseOperation](Number(inputValue), Number(memo)) : newVar;
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

  const clearInput = () => {
    setHistory("");
  }

  useEffect(() => {
    const insertValue = inputValue;
    const memoValue = memo;
    if (baseOperation !== "")
      setHistory(`${insertValue} ${baseOperation}`);
    if (stateOperation) {
      setHistory(`${prevInputValueRef.current} ${baseOperation} ${memoValue} =`);
    }
    prevInputValueRef.current = inputValue
  }, [inputValue, baseOperation, memo, stateOperation]);

  return (
    <div className="App">
      <header>
        <h1>WebCalculator</h1>
      </header>
      <main>
        <section>
          <div>
            <input type="text" value={history} />
          </div>
          <div>
            <input type="text" onChange={handleInputChange} value={showInput ? memo : inputValue} />
          </div>

          <div>
            {numberArray.map((number) => (
              <button key={number} onClick={() => calculate(number)}>{number}</button>
            ))}
          </div>
          <button onClick={() => clearInput()}>Remove entry</button>
          <div>
            {basicArray.map((base_op) => (
              <button key={base_op} onClick={() => basicOperation(base_op)}>{base_op}</button>
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
