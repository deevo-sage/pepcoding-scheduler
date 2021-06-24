import moment from "moment";
import * as React from "react";
import actions from "../../../actions";
import plusIcon from "../../../assets/images/plusIcon.svg";
import { classes, Teacher } from "../types";

const mintime = moment("08:00", "hh:mm"),
  maxtime = moment("20:00", "hh:mm");
export const ModalButton: React.FunctionComponent<{
  showModal: boolean;
  setshowModal: Function;
}> = ({ setshowModal, showModal }) => {
  return (
    <div
      className="modalButton"
      onClick={() => {
        setshowModal(!showModal);
      }}
    >
      <img src={plusIcon} height="50%" width="50%" />
    </div>
  );
};
const today = moment();
export const ModalBody: React.FunctionComponent<{
  showModal: boolean;
  setshowModal: Function;
  teachers: Teacher[];
  classes: classes[];
  dated: moment.Moment;
}> = ({ setshowModal, showModal, teachers, dated }) => {
  const [teacher, setteacher] = React.useState<Teacher>({
    name: null,
    id: null,
    subject: null,
  });
  const [date, setdate] = React.useState(
    `${dated.year()}-${
      dated.month() + 1 < 10 ? "0" + (dated.month() + 1) : today.month() + 1
    }-${dated.date() < 10 ? "0" + dated.date() : today.date()}`
  );

  const [starttime, setstarttime] = React.useState("08:00");
  const [endtime, setendtime] = React.useState("09:00");
  const [repeating, setrepeating] = React.useState(false);
  React.useEffect(() => {
    setdate(
      `${dated.year()}-${
        dated.month() + 1 < 10 ? "0" + (dated.month() + 1) : today.month() + 1
      }-${dated.date() < 10 ? "0" + dated.date() : today.date()}`
    );
  }, [dated]);

  React.useEffect(() => {
    if (teachers[0]) setteacher(teachers[0]);
  }, [teachers]);
  // React.useEffect(() => {
  //   console.log(`${moment(date + " " + starttime).toDate()}`);
  // });
  const submitHandler = async () => {
    const classes: classes[] = (
      await actions.classaction.getteacher(teacher.id)
    ).data.classes;
    let flag = false;
    const times = moment(date + " " + starttime),
      timee = moment(date + " " + endtime),
      hourcheckstart = moment(
        `${times.hour() + ":" + times.minute()}`,
        "hh:mm"
      ),
      hourcheckend = moment(`${timee.hour() + ":" + timee.minute()}`, "hh:mm");
    classes.forEach((i, key) => {
      const stime = moment(i.startTime),
        etime = moment(i.endTime),
        starthourcheck = moment(
          `${stime.hour() + ":" + stime.minute()}`,
          "hh:mm"
        ),
        endhourcheck = moment(
          `${etime.hour() + ":" + etime.minute()}`,
          "hh:mm"
        );
      if (!i.repeating) {
        // console.log(
        //   times.hour(),
        //   stime.hour(),
        //   etime.hour(),
        //   times.isBetween(stime, etime, "hour"),
        //   timee.isBetween(stime, etime, "hour"),
        //   key
        // );

        if (
          times.isBetween(stime, etime) ||
          timee.isBetween(stime, etime) &&
          // timee.hour() === etime.hour() ||
          // timee.hour() === stime.hour() ||
          // times.hour() === etime.hour() ||
          // times.hour() === stime.hour() ||
          ((hourcheckstart.isBefore(starthourcheck) ||
            hourcheckstart.hour() === starthourcheck.hour()) &&
            (hourcheckend.isAfter(endhourcheck) ||
              hourcheckend.hour() === endhourcheck.hour()))
        ) {
          flag = true;
        }
      } else {
        // console.log(
        //   times.isBetween(stime, etime, "hour"),
        //   timee.isBetween(stime, etime, "hour"),
        //   timee.hour() === etime.hour(),
        //   timee.hour() === stime.hour(),
        //   times.hour() === etime.hour(),
        //   times.hour() === stime.hour(),
        //   "b",
        //   key,
        //   stime.day(),
        //   times.day()
        // );
        if (stime.day() === times.day()) {
          // console.log(`${times.hour() + ":" + times.minute()}`);

          console.log(
            hourcheckstart.isBetween(starthourcheck, endhourcheck),
            hourcheckend.isBetween(starthourcheck, endhourcheck)
          );
          if (
            hourcheckstart.isBetween(starthourcheck, endhourcheck) ||
            hourcheckend.isBetween(starthourcheck, endhourcheck) ||
            // timee.hour() === etime.hour() ||
            // timee.hour() === stime.hour() ||
            // times.hour() === etime.hour() ||
            // times.hour() === stime.hour() ||
            ((hourcheckstart.isBefore(starthourcheck) ||
              hourcheckstart.hour() === starthourcheck.hour()) &&
              (hourcheckend.isAfter(endhourcheck) ||
                hourcheckend.hour() === endhourcheck.hour()))
          ) {
            if (true) flag = true;
          }
        }
      }
    });
    if (!flag) {
        const res = await actions.classaction.createclass({
          teacherID: teacher.id,
          starttime: `${times.toDate()}`,
          endtime: `${timee.toDate()}`,
          repeating,
        });
        console.log(res.data);
      console.log("done");
    } else {
      alert("class overlaps with a teachers already existing class");
    }
  };
  return (
    <div className="modalForm">
      <div className="close">
        <div
          onClick={() => {
            setshowModal(!showModal);
          }}
        >
          <img src={plusIcon} height="75%" width="75%" />
        </div>
      </div>
      <div className="formbody">
        <h2>Schedule Class</h2>
        <div>
          {" "}
          Teacher :
          <select
            value={teacher.name != null ? teacher.id : ""}
            onChange={(e) => {
              // console.log(teachers.filter((t) => t.id == e.target.value)[0]);
              setteacher(
                teachers.filter((t) => t.id.toString() == e.target.value)[0]
              );
            }}
          >
            {teachers.map(({ id, name }, key) => {
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
        </div>{" "}
        <div>
          {" "}
          Date:
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setdate(e.target.value);
            }}
          />
        </div>
        <div>
          Start Time :
          <input
            type="time"
            value={starttime}
            onChange={(e) => {
              const time = moment(e.target.value, "HH:mm");
              if (time.isAfter(moment(endtime, "HH:mm")))
                alert("start time cannot be more that end time");
              else if (
                Math.abs(time.diff(moment(endtime, "HH:mm"), "hour", false)) < 1
              )
                alert("class cannot be smaller that 1hr");
              else if (time.isBetween(mintime, maxtime))
                setstarttime(time.format("HH:mm"));
              else alert("time cannot be less than 8am and more than 10pm");
            }}
          />
        </div>
        <div>
          End Time :
          <input
            type="time"
            value={endtime}
            onChange={(e) => {
              const time = moment(e.target.value, "HH:mm");
              if (time.isBefore(moment(starttime, "HH:mm")))
                alert("end time cannot be less that start time");
              else if (time.diff(moment(starttime, "HH:mm"), "hour", false) < 1)
                alert("class cannot be smaller that 1hr");
              else if (time.isBetween(mintime, maxtime))
                setendtime(time.format("HH:mm"));
              else alert("time cannot be less than 8am and more than 10pm");
            }}
          />
        </div>{" "}
        <div>
          (repeats every week?)
          <span>
            Repeating :{" "}
            <input
              checked={repeating}
              onChange={(e) => {
                setrepeating(e.target.checked);
              }}
              type="checkbox"
            />{" "}
          </span>
        </div>
        <div className="buttoncont">
          <div className="submitButton" onClick={submitHandler}>
            Submit
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
