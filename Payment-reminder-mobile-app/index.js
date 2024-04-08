import express from "express";
const app = express();
import dotenv from"dotenv";
import mongoose from "mongoose"


//import routes
import authRoute from "./routes/auth";
import postRoute from "./routes/post";


dotenv.config();
// connect to DB
mongoose.connect( 
    process.env.DB_CONNECT, // connects to the db uri in .env
    { useNewUrlParser:true},
    () => console.log('Connected to db!')
);

// middleware
app.use(express.json());

// routes middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute)

app.listen(8800, () => 
                console.log('Server up and running'));
