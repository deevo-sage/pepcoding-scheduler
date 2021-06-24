import { RouteComponentProps } from "@reach/router";
import moment from "moment";

export type classes = {
  endTime: Date;
  id: number;
  name: string;
  repeating: number;
  startTime: Date;
  subject: string;
  teacherID: number;
};
export type Teacher = { name: string; id: number; subject: string };
export type Dated = [number, number, number, number, moment.Moment];
export interface calenderinterface extends RouteComponentProps {
  teachers: Teacher[];
} 