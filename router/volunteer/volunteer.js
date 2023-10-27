const router = require("express").Router();
const volunteerModel = require("../../models/volunteerSchema");

router.get("/", (req, res) => {
    // get the id from the query
    const {_id} = req.body;
    if(!_id){
        console.log("volunteer id is empty in request");
        res.status(400).json({message: "id not found in request"});
        return;
    }
    try{
        console.log("finding volunteer with id ", _id);
        // find the volunteer with the id
        const response = volunteerModel.findById(_id);
        console.log("response", response);
        if(response){
            console.log("volunteer found successfully");
            res.status(200).json({message: "volunteer found successfully", data: response})
        }
        else{
            console.log("volunteer not found");
            res.status(404).json({message: "volunteer not found"})
        }
    }catch(error){
        console.error("error occured while finding volunteer", error);
        res.status(500).json({message: "error occured while finding volunteer"})
    }
});

module.exports = router;