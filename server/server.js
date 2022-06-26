import express from "express";
import {readdirSync} from "fs";
import cors from "cors";
const morgan = require("morgan");
import mongoose from "mongoose";
require('dotenv').config();

const app = express();


// db connection

mongoose.connect(process.env.DATABASE, {
//    useNewUrlParser: true,
  //  useFindAndModify: false,
    //useUnifiedTopology: true,
    //useCreateIndex: true
})
.then( () => console.log('Db connected'))
.catch( (err)=> console.log('DB connection error:', err));



// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route middleware
readdirSync("./routes").map( (r) => 
    app.use("/api", require(`./routes/${r}`)));


const port = process.env.PORT || 7000;

app.listen(port, (req, res)=> console.log(`Server is running on port ${port}`));
