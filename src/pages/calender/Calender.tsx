import * as React from "react";
import { useState } from "react";
import moment from "moment";
import Mycalenders from "./components";
import actions from "../../actions";
import { classes, Dated, Teacher, calenderinterface } from "./types";
import { ModalButton, ModalBody } from "./components/modal";
import { Modal } from "../../common/modal";
let date = moment(new Date());

const Calender: React.FunctionComponent<calenderinterface> = ({ teachers }) => {
  const [teacher, setTeacher] = useState<Teacher>({
    name: null,
    id: null,
    subject: null,
  });
  const [Wclasses, setWclasses] = useState<classes[]>([]);
  const [dated, setdated] = useState<Dated>([
    date.year(),
    date.month() + 1,
    date.date(),
    date.week() - 1,
    date,
  ]);
  const [counts, setcounts] = useState<number[]>([0, 0]);
  const [showModal, setshowModal] = useState(false);
  React.useEffect(() => {
    if (teachers[0]) {
      setTeacher(teachers[0]);
    }
  }, [teachers]);
  const getWclasses = () => {
    if (teacher.name != null) {
      if (teacher.name === "all") {
        actions.classaction
          .getall()
          .then((item) => {
            console.log(item.data.classes);
            setWclasses(item.data.classes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else
        actions.classaction
          .getteacher(teacher.id)
          .then((item) => {
            console.log(item.data.classes);
            setWclasses(item.data.classes);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };
  React.useEffect(() => {
    getWclasses();
  }, [teacher]);
  React.useEffect(() => {
    let x = [0, 0];
    Wclasses.forEach((i) => {
      if (i.repeating) x[0] += 1;
      else x[1] += 1;
    });
    setcounts(x);
  }, [Wclasses]);
  const [mode, setmode] = useState<"day" | "week" | "month">("day");
  return (
    <div className="calender">
      <Modal showModal={showModal} setshowModal={setshowModal}>
        <ModalBody
          dated={dated[4]}
          showModal={showModal}
          setshowModal={setshowModal}
          teachers={teachers}
          classes={Wclasses}
          getWclasses={getWclasses}
        />
      </Modal>
      <div className="topBar">
        <div>
          <select
            value={teacher.name != null ? teacher.id : ""}
            onChange={(e) => {
              // console.log(teachers.filter((t) => t.id == e.target.value)[0]);
              if (e.target.value === "all") {
                setTeacher({ id: 9999, name: "all", subject: "all" });
              } else
                setTeacher(
                  teachers.filter((t) => t.id.toString() == e.target.value)[0]
                );
            }}
          >
            <option value="all">All</option>
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
        </div>
        {teacher && (
          <div>
            <b>Subject</b> : {teacher.subject}
          </div>
        )}
        {teacher && (
          <div>
            <b>Weekly Classes</b>: {counts[0]}
          </div>
        )}
        {teacher && (
          <div>
            <b>Extra Classes</b>:{counts[1]}
          </div>
        )}
      </div>
      <div className="calenderBody">
        <div className="calenderTopBar">
          <div>
            <b>Select {mode} :&nbsp;&nbsp; </b>
            {mode === "week" && (
              <input
                onChange={(e) => {
                  const time = moment(e.target.value);
                  setdated([
                    time.year(),
                    time.month() + 1,
                    time.date(),
                    time.week() - 1,
                    time,
                  ]);
                }}
                type={mode}
                value={`${dated[0]}-W${dated[3]}`}
              />
            )}
            {mode === "day" && (
              <input
                onChange={(e) => {
                  const time = moment(e.target.value);
                  setdated([
                    time.year(),
                    time.month() + 1,
                    time.date(),
                    time.week(),
                    time,
                  ]);
                }}
                type={"date"}
                min="2021-06-01"
                value={`${dated[0]}-${
                  dated[1] < 10 ? "0" + dated[1] : dated[1]
                }-${dated[2] < 10 ? "0" + dated[2] : dated[2]}`}
              />
            )}
            {mode === "month" && (
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  const time = moment(e.target.value, "yyyy-MM");
                  console.log(
                    time.year(),
                    time.month() + 1,
                    time.date(),
                    time.week() - 1,
                    time
                  );
                  setdated([
                    time.year(),
                    time.month() + 1,
                    time.date(),
                    time.week() - 1,
                    time,
                  ]);
                }}
                type={mode}
                value={`${dated[0]}-${
                  dated[1] < 10 ? "0" + dated[1] : dated[1]
                }`}
                min="2021-06"
              />
            )}
          </div>
          <div className="buttonGroup">
            <div
              onClick={() => setmode("day")}
              className={mode === "day" ? "active" : ""}
            >
              day
            </div>
            <div
              onClick={() => setmode("week")}
              className={mode === "week" ? "active" : ""}
            >
              Week
            </div>
            <div
              onClick={() => setmode("month")}
              className={mode === "month" ? "active" : ""}
            >
              Month
            </div>
          </div>
        </div>
        <div className="calenderMain">
          {mode === "day" && (
            <Mycalenders.DayCalender
              list={Wclasses.filter((item) => {
                const time = moment(item.startTime);
                if (!item.repeating) {
                  return (
                    time.date() === dated[2] &&
                    time.month() + 1 === dated[1] &&
                    time.year() === dated[0]
                  );
                } else {
                  return time.day() === dated[4].day();
                }
              })}
            />
          )}
          {mode === "week" && (
            <Mycalenders.WeekCalender
              list={Wclasses.filter((item) => {
                const time = moment(item.startTime);
                if (!item.repeating) return time.week() - 1 === dated[3];
                else {
                  return true;
                }
              })}
            />
          )}
          {mode === "month" && (
            <Mycalenders.MonthCalender
              list={Wclasses.filter((item) => {
                const time = moment(item.startTime);
                if (!item.repeating) return time.month() + 1 === dated[1];
                else {
                  return true;
                }
              })}
              dated={dated}
            />
          )}
        </div>
      </div>
      <ModalButton showModal={showModal} setshowModal={setshowModal} />
    </div>
  );
};
export default Calender;
