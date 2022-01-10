import { connect } from "mongoose";
import 'dotenv/config';

let mongoConnect = {
    connect: async () => {
        if(process.env.MONGODBCONNECT)
        await connect(process.env.MONGODBCONNECT);
    }
}

export  {mongoConnect};

     


 