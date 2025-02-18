const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const userModel = require("./models/user");
const user = require("./models/user");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read",{users});
  console.log(users);
  
});

app.post("/create", async (req, res) => {
  let { username, email, city } = req.body;
  let createdUser = await userModel.create({
    username,
    email,
    city,
  });
  //res.send(createdUser);
  console.log("aaaa");
  console.log(createdUser);
  res.redirect('/read');
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
