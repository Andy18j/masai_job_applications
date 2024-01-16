const mongoose = require("mongoose")


const jobSchema = mongoose.Schema({

    company : {type:String,required:true},
    postedAt: {type:Date,required:true},
    city    : {type:String,required:true},
    location :{type:String,required:true},
    role     : {type:String,enum:["Frontend", "Backend", "FullStack", "Other"],required:true},
    level:    { type: String,enum: ["Junior", "Senior", "Other"],required: true},
    contract: {type: String,enum: ["Full Time", "Part Time", "Other"],required: true},
    position: {type: String,enum:["Backend Developer","Junior Frontend Developer","Junior Backend Developer","FSD"], required: true},
    language: {type: String,enum: ["Javascript", "Java", "C", "C++", "Other"],required: true
    }
})

const jobModel = mongoose.model("job",jobSchema)


module.exports={
    jobModel
}