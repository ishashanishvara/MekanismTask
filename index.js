import express from 'express';
import dotenv from 'dotenv'
import  mongoose  from 'mongoose';
import router from './routes/users.routes.js';
import booksRouter from './routes/books.routes.js'
dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth",router);
app.use("/books",booksRouter);
try {
    const mongoDBConnection = mongoose.connect(process.env.MONGODB_URL);
    if(mongoDBConnection){
        console.log("db connected");
    }
} catch (error) {
    console.log("error connecting db",error)
}

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("server running");
});
