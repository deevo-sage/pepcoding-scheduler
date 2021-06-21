import * as React from "react";
import { Router } from "@reach/router";
import Calender from "./pages/calender/Calender";
import "./styles/main.scss";
const App = () => {
  return (
    <div className="app">
      <Router>
        <Calender path="/" />
      </Router>
    </div>
  );
};
export default App;
