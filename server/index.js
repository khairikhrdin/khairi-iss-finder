const express = require("express");
const app = express();
const cors = require("cors");

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
    tempMinus = tempMinus - 600000; //10 mins * 60 secs * 1000 milisecs
    tempPlus = tempPlus + 600000;
    minusHourTS[i] = tempMinus;
    plusHourTS[i] = tempPlus;
    
    console.log("Minus: " + minusHourTS[i]);
    console.log("Plus: " + plusHourTS[i]);
  }

  const concatVar = concatArr.concat(minusHourTS, plusHourTS);
  console.log(concatVar);


  
});

app.listen(3001, () => {
  console.log("Test");
});
