var axios = require("axios");

const getall = async () => {
  return await axios.get("http://localhost:3000/class/get");
};
getall().then((r) => {
  console.log(r.data);
});
