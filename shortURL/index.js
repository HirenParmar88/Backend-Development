const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

const URL=require('./models/url');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("mongodb is connected..")
);

app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId",async (req, res) => {
  //res.send("done");
    const shortId=req.params.shortId;
    //console.log("shortId :",shortId);
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestemp:Date.now(),
        }
    }},{new: true})
    // entry.visitHistory.push({timestamp: Date.now()});
    await entry.save();
    console.log("entry :-",entry);
    res.redirect(entry.redirectURL)
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
