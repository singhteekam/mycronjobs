const nodeCron = require("node-cron");
const axios = require("axios");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("-Running cron... at: " + new Date().toLocaleString());
  res.send("Running cron... at: " + new Date().toLocaleString());
});


// Running job every hour:10 mins. ex: 1:10, 2:10,3:10
nodeCron.schedule("*/10 * * * *", async function jobYouNeedToExecute2() {
  console.log("Running job at: " + new Date().toLocaleString());

  axios
    .get(process.env.URL_STRING)
    .then((response) => {
      console.log(
        "Axios calling cron: " +
          response.data +
          " at: " +
          new Date().toLocaleString()
      );
    })
    .catch((error) => {
      console.log(error);
    });
});


const port = process.env.PORT || 5000;
app.listen(port);