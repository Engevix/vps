const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect to database
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("database.json");
const db = low(adapter);

// Home page
app.get("/", (req, res) => {
  const menu = db.get("menu").value();
  const sermon = db.get("sermons").find({ id: 0 }).value();
  const sermons = db.get("sermons").value();
  const events = db.get("events").value();
  if (menu) {
    const location = req.path;
    res.render("pages/home", {
      location: location,
      menu: menu,
      sermon: sermon,
      sermons: sermons,
      events: events,
    });
  }
  // console.log(menu);
});

// Sermons page
app.get("/sermons", (req, res) => {
  const menu = db.get("menu").value();
  if (menu) {
    const location = req.path;
    res.render("pages/sermons", {
      location: location,
      menu: menu,
    });
  }
  // console.log(menu);
});

// Events page
app.get("/events", (req, res) => res.send("Hello World!"));

// About page
app.get("/about", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://185.69.154.177:${port}`)
);
