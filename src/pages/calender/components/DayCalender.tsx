import moment from "moment";
import * as React from "react";
import { classes } from "../types";

let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const DayCalender: React.FunctionComponent<{
  list: classes[];
}> = ({ list }) => {
  const [daylist, setdaylist] = React.useState([]);
  React.useEffect(() => {
    let temp = list
      .sort((a, b) => {
        const timeas = moment(a.startTime),
          timebs = moment(b.startTime);
        return timeas.hour() - timebs.hour();
      })
      .sort((a, b) => {
        const timeas = moment(a.startTime),
          timeae = moment(a.endTime),
          timebs = moment(b.startTime),
          timebe = moment(b.endTime);
        return timeae.hour() - timeas.hour() - timebe.hour() + timebs.hour();
      });
    setdaylist(temp);
  }, [list]);
  return (
    <div className="dayCalender">
      <div className="calenderTop">
        <div>08AM-10PM</div>
        <div>10AM-12PM</div>
        <div>12PM-02PM</div> <div>02PM-04PM</div> <div>04PM-06PM</div>
        <div>06PM-08PM</div> <div>08PM-10PM</div>{" "}
      </div>
      <div className="DcalenderGrid">
        {daylist.map((item, key) => {
          if (key === 0) {
            count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
          const end = moment(item.endTime);
          const start = moment(item.startTime);

          return (
            <div
              key={`${end}`}
              style={{
                gridColumn: `${start.hours() - 7} / span ${
                  end.hours() - start.hours()
                }`,
              }}
            >
              {" "}
              <b> {item.name}</b> <br />
              <b>
                {" "}
                {item.subject}
                <span>
                  ({start.format("hh:mm") + "-" + end.format("hh:mm")})
                </span>{" "}
              </b>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DayCalender;
