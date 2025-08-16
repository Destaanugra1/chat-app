import { connect } from "mongoose";

const mongoUrl = process.env.DATABASE_URL !;

connect(mongoUrl).then(() => {
    console.log("database connected");
    
}).catch((err) => {
    console.log(err);
    
})