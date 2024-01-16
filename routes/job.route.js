const express = require("express")

const {jobModel} = require("../model/job.model")  //use model to demonstrate our routes

const jobRouter = express.Router()   //create a router


//for posting the job details
jobRouter.post("/post",async(req,res)=>{
    try{
        const job = await jobModel.create(req.body)
        await job.save()
        res.status(201).json({msg:"Job Details Save Sucessfully..",job})

    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Something went wrong to posting a job details"})
    }
})


//for retriving job details
jobRouter.get("/get",async(req,res)=>{
    try{
           const job = await jobModel.find()
           res.status(200).json({msg:"Your Job Details Are Here...",job})
    }
    catch(err){
        console.log(err)
        res.status(502).json({msg:"Something went wrong to retrive the data.."})
    }
})

//filtering route by its role
jobRouter.get("/filter", async (req, res) => {
    try {
        const { role } = req.query;
        if (!role) {
            return res.status(400).json({ msg: "Role parameter is required for filtering." });
        }
        const jobs = await jobModel.find({ role });
        res.status(200).json({ msg: "Filtered jobs retrieved successfully.", jobs });
    } catch (err) {
        console.log(err);
        res.status(502).json({ msg: "Something went wrong retrieving filtered jobs." });
    }
});

// Searching jobs by tech stack
jobRouter.get("/search", async (req, res) => {
    try {
        const { techstack } = req.query;
        if (!techstack) {
            return res.status(400).json({ msg: "Techstack parameter is required for searching"});
        }
        const jobs = await jobModel.find({ language: { $regex: new RegExp(techstack, "i") } });
        res.status(200).json({ msg: "Jobs related to techstack retrieved successfully", jobs });
    } catch (err) {
        console.log(err);
        res.status(502).json({ msg: "Something went wrong retrieving jobs related to techstack"});
    }
});


// Sorting jobs by date
jobRouter.get("/sortbydate", async (req, res) => {
    try {
        const jobs = await jobModel.find().sort({ postedAt: -1 }); // Sorting in descending order by default
        res.status(200).json({ msg: "Jobs sorted by date retrieved successfully.",jobs});
    } catch (err) {
        console.log(err);
        res.status(502).json({ msg: "Something went wrong retrieving sorted jobs"});
    }
});


// Pagination for job details
jobRouter.get("/paginate", async (req, res) => {
    try {
        const { page } = req.query;
        const itemsPerPage = 10;
        const pageNumber = parseInt(page) || 1;
        const skip = (pageNumber - 1) * itemsPerPage;
        const jobs = await jobModel.find().skip(skip).limit(itemsPerPage);
        res.status(200).json({ msg: "Job details paginated successfully.",jobs});
    } catch (err) {
        console.log(err);
        res.status(502).json({ msg: "Something went wrong paginating job details"});
    }
});

module.exports = {
    jobRouter
}