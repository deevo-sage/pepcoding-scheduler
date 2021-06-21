import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import { ExtraClass, Teachers, WeeklyClass } from "../../dummy";
import { useState } from "react";
const Calender: React.FunctionComponent<RouteComponentProps> = () => {
  const [teacher, setTeacher] = useState<typeof Teachers[0]>(Teachers[0]);
  const [Wclasses, setWclasses] = useState(WeeklyClass);
  const [Eclasses, setEclasses] = useState(ExtraClass);
  return (
    <div className="calender">
      <div className="topBar">
        <div>
          <select
            value={teacher.id}
            onChange={(e) => {
              //action here
              setTeacher(Teachers.filter((t) => t.id === e.target.value)[0]);
            }}
          >
            {Teachers.map(({ id, name }) => {
              return (
                <option
                  value={id}
                  key={id}
                  className={
                    id === teacher.id ? "selectedOption" : "defaultOption"
                  }
                >
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        {teacher && (
          <div>
            <b>Subject</b> : {teacher.subject}
          </div>
        )}
        {teacher && (
          <div>
            <b>Class Per Week</b>: {Wclasses.length}
          </div>
        )}
        {teacher && (
          <div>
            <b>Extra Classes</b>:{ExtraClass.length}
          </div>
        )}
      </div>
      <div className="calenderBody">
        <div className="calenderTopBar">
          <div>
            <input type="date" />
          </div>
          <div>
            <button>day</button>
            <button>Week</button>
            <button>Month</button>
          </div>
        </div>
        <div className="calenderMain"></div>
      </div>
    </div>
  );
};
export default Calender;
