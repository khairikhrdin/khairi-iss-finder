const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(express.json());
app.use(cors());

app.post("/post_date", async (req, res) => {
  let { timeStamp } = req.body;
  let tempMinus = timeStamp;
  let tempPlus = timeStamp;

  const minusHourTS = [];
  const plusHourTS = [];
  const concatArr = [];

  console.log(timeStamp);

  for (let i = 0; i < 6; i++) {
    tempMinus = tempMinus - 600; //10 mins * 60 secs
    tempPlus = tempPlus + 600;
    minusHourTS[i] = tempMinus;
    plusHourTS[i] = tempPlus;
  }

  // const concatVar = concatArr.concat(minusHourTS, plusHourTS);
  // console.log(concatVar);

  // console.log("Minus: " + minusHourTS);
  // console.log("Plus: " + plusHourTS);

  axios
    .get(
      "https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=" +
        minusHourTS +
        ", " +
        timeStamp +
        ", " +
        plusHourTS
    )
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/get_people", async (req, res) => {
  axios
    .get("http://api.open-notify.org/astros.json")
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3001, () => {
  console.log("Test");
});
