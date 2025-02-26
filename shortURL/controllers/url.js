const shortid = require("shortid");
const UrlModel = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;
    console.log("url : ", url);

    if (!url) {
      return res.status(400).json({ error: "body is required" });
    }
    const shortID = shortid.generate();
    const newUrl = await UrlModel.create({
      shortId: shortID,
      redirectURL: url,
    });
    console.log("newUrl",newUrl);

    return res.json({ id: shortID });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Database error", details: error.message });
  }
}

async function handleGetAnalytics(req,res) {
    const shortId =req.params.shortId;
    const result=await UrlModel.findOne({shortId})    
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics: result.visitHistory,
     })
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
};
