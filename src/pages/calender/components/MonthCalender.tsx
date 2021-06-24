import moment, { Moment } from "moment";
import * as React from "react";
import { classes, Dated } from "../types";

const MonthCalender: React.FunctionComponent<{
  list: classes[];
  dated: Dated;
}> = ({ list, dated }) => {
  const [Mlist, setMlist] = React.useState<typeof list[]>([]);
  const [day, setday] = React.useState(
    dated[4].subtract(dated[4].date() - 1, "day").day()
  );
  React.useEffect(() => {
    // console.log(dated[4].subtract(dated[4].date() - 1, "day").day());
    setday(dated[4].subtract(dated[4].date() - 1, "day").day());
  }, [list, dated]);
  React.useEffect(() => {
    // console.log(time.day(), count.length);
    const temp = list.sort((a, b) => {
        const timeas = moment(a.startTime),
          timebs = moment(b.startTime);
        return timeas.date() - timebs.date();
      }),
      main = [];
    for (let i = 0; i < Math.max(35, day + dated[4].daysInMonth()); i++) {
      main[i] = [];
    }
    temp.forEach((item, key) => {
      const time = moment(item.startTime);
      // console.log(time.date() + day - 2);
      if (item.repeating) {
        for (let i = 1; i <= day + dated[4].daysInMonth(); i++) {
          if (time.day() === i % 7) {
            main[i].push(item);
            console.log(time.day(), time.date());
          }
        }
      } else main[time.date() + day - 1].push(item);
    });
    // console.log(main);

    setMlist(main);
  }, [day, list]);
  return (
    <div className="monthCalender">
      <div className="calenderTop">
        {moment.weekdays().map((item) => {
          return <div key={item}>{item}</div>;
        })}{" "}
      </div>
      <div className="McalenderGrid">
        {Mlist.map((item, key) => {
          const today = key + 1 - day;
          return (
            <div key={item.length + " " + key}>
              <div className="monthtop">
                {" "}
                {today > 0 && today <= dated[4].daysInMonth() ? today : ""}
              </div>{" "}
              <div className="monthbottom">
                {item.map((item, key) => {
                  const times = moment(item.startTime),
                    timee = moment(item.endTime);
                  return (
                    <div key={item.name + item.subject + key}>
                      {item.subject === "JavaScript"
                        ? "JS"
                        : item.subject === "python"
                        ? "Py"
                        : item.subject}
                      ({times.format("hh:mm") + "-" + timee.format("hh:mm")})
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MonthCalender;
