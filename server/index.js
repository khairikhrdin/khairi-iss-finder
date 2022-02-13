const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/post_date", async (req, res) => {
  let { datetime } = req.body;

  datetime = Math.floor(datetime / 1000);
  console.log(datetime);
});

app.listen(3001, () => {
  console.log("Test");
});
