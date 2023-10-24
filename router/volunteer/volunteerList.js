const router = require("express").Router();
const volunteerData = require("../../models/volunteerSchema");
const profileModel = require("../../models/profileSchema")

router.get("/:id", async (req, res) => {
  let id = req?.params?.id;

  console.log("SR:router-volunteerList try-> ", id);
  // if(id=="sw.js") id={
  //   "_id": "11111aaa1aa111a1aa11111a"
  // };
  if(id=="sw.js") {res.status(404).json([]);return;}
  try {
    if (id!=="all") {
      const volunteer = await volunteerData
      .findOne({ profile: id })
      ?.populate('profile')
      ?.populate({
        path: 'works.workDetails',
        populate: {
          path: 'profile',
          model: 'profileModel'
        }
      })
      .exec();
    

      if (volunteer) {
        res.status(200).send({ data: volunteer });
      } else {
        const userData =await profileModel.findById(id);
        if(userData){
          res.status(200).send({data:userData});
        }
        else{
          res.status(404).json({ message: "Volunteer not found" });
        }
      }
    } else {
      const volunteers = await volunteerData.find({}).populate('profile').exec();
      res.status(200).json(volunteers);
    }
  } catch (err) {
    console.log("SR:router-volunteerList: error", err);
    res.status(500).json({ message: "Error retrieving volunteers" });
  }
});

module.exports = router;
