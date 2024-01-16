const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { jobRouter } = require("./routes/job.route")
require("dotenv").config()



const app = express()
app.use(express.json())
app.use(cors())

app.use("",jobRouter)



//checking my server is running well or not
app.get("/",(req,res)=>{
    res.send("Welcome To Masai Job Application")
})

//starting server 
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected To The DB")

    }
    catch(err){
        console.log("Not connected to the DB")
    }
    console.log(`port is running on the ${process.env.port}`)
})