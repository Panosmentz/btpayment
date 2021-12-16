import React from "react";
import Dropin from "./components/Dropin";
import Results from "./components/Results";
import "./App.css";
import { GlobalProvider } from "./Context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Dropin />
        <Results />
      </div>
    </GlobalProvider>
  );
}

export default App;
