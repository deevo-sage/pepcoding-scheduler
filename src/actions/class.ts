import axios from "axios";
import config from "../config";
import { classes } from "../pages/calender/types";

const getall = async () => {
  return await axios.get<{ classes: classes[] }>(config.db + "/class/get");
};
const getteacher = async (id: number) => {
  return await axios.get<{ classes: classes[] }>(
    config.db + "/class/get/" + id
  );
};
const createclass = async (body: {
  teacherID: number;
  endtime: string;
  starttime: string;
  repeating: boolean;
}) => {
  return await axios.post<classes>(config.db + "/class/create", body);
};
export default {
  getall,
  getteacher,
  createclass,
};
