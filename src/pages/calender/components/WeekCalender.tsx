import moment from "moment";
import * as React from "react";
let count = [0, 0, 0, 0, 0, 0, 0];
import { classes } from "../types";

const WeekCalender: React.FunctionComponent<{
  list: classes[];
}> = ({ list }) => {
  return (
    <div className="monthCalender">
      <div className="calenderTop">
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div> <div>Thursday</div> <div>Friday</div>
        <div>Saturday</div> <div>Sunday</div>{" "}
      </div>
      <div className="WcalenderGrid">
        {list.map((item, key) => {
          if (key === 0) {
            count = [0, 0, 0, 0, 0, 0, 0];
          }
          const end = moment(item.endTime);
          const start = moment(item.startTime);
          count[start.day() - 1] += 1;
          return (
            <div
              key={`${end}`}
              style={{
                gridArea: `${
                  count[start.day() - 1]
                } /${start.day()} / span 1 / span 1`,
              }}
            >
              {" "}
              <b> {item.name}</b> <br />
              <b>
                {" "}
                {item.subject === "JavaScript"
                  ? "JS"
                  : item.subject === "python"
                  ? "Py"
                  : item.subject}{" "}
                ({start.format("hh:mm") + "-" + end.format("hh:mm")} )
              </b>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WeekCalender;
