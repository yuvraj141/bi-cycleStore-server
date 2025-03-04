import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server:Server
async function main(){
try {
    await mongoose.connect(config.database_url)

    server=app.listen(config.port,()=>{
        console.log(`app is running on port ${config.port}⚡yee`);
    })
} catch (error) {
    console.log(error);
}

}
main()