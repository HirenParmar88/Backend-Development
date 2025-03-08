import express from "express";
import router from "./router/index.js";
//import morgan from "morgan";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//app.use(morgan("combined"));
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions))

app.use("/", router);


app.get("/", (req, res) => {
  res.send("Server is running..");
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});