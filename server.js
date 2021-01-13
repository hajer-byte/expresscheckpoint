const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  (verifDate = (req, res, next) => {
    const date = new Date();
    const day = date.toDateString().substring(0, 3);
    const hour = date.toTimeString().substring(0, 2);
    let time = false;
    switch (day) {
      case "Mon":
      case "Tue":
      case "Thu":
      case "Wed":
      case "Fri":
        time = true;
    }
    if (time === true && hour >= 9 && hour <= 17) {
      next();
    } else res.send("The web application is only available in working time !");
  })
);

app.get("/", (req, res) => {
  res.render("Home");
});
app.get("/Contact", (req, res) => {
  res.render("Contact");
});

app.get("/services", (req, res) => {
  res.render("services");
});
//post

//server
const port = 5000;
app.listen(port, (err) => {
  if (err) console.log("connection Failed");
  else console.log(`server is connected ${port}`);
});
