const express = require("express");
const router = express.Router();

module.exports = router.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  if (!date) {
    date = new Date();
  } else {
    const isDateInt = /^\d+$/.test(date);
    date = isDateInt ? new Date(parseInt(date)) : new Date(date);

    if (date.toString() === "Invalid Date") {
      return res.json({
        error: "Invalid Date",
      });
    }
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});
