const router = require("express").Router();
const volunteerData = require("../../models/volunteerSchema");
const profileModel = require("../../models/profileSchema");

router.get("/", async (req, res) => {
  try {
    console.log("finding all volunteers");
    const volunteers = await volunteerData.find({}).populate("profile").exec();
    res.status(200).json(volunteers);
  } catch (err) {
    console.log("SR:router-volunteerList: error", err);
    res.status(500).json({ message: "Error retrieving volunteers" });
  }
});

module.exports = router;
