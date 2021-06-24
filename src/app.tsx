import * as React from "react";
import { Router } from "@reach/router";
import Calender from "./pages/calender/Calender";
import "./styles/main.scss";
import teacher from "./actions/teacher";
const App = () => {
  const [teachers, setteachers] = React.useState<any>([]);
  React.useEffect(() => {
    teacher.teachers().then((item) => {
      setteachers(item.data.teachers);
    });
  }, []);
  return (
    <div className="app">
      <Router>
        <Calender path="/" teachers={teachers} />
      </Router>
    </div>
  );
};
export default App;
