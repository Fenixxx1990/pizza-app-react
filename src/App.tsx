import { useState, type MouseEvent } from "react";
import "./App.css";
import Button from "./Button/Button";

function App() {
  const [coutner, setCounter] = useState<number>(1);

  const addCounter = (e: MouseEvent) => {
    console.log(e);
  };

  return (
    <>
      <Button onClick={addCounter}>Кнопка</Button>
    </>
  );
}

export default App;
