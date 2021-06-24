import axios from "axios";
import config from "../config";

const teachers = async () => {
  return await axios.get(config.db + "/teacher/get");
};

export default {
  teachers,
};
