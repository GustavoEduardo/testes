import 'dotenv/config';
import knex from 'knex'

let port: any = process.env.DATABASE_PORT;

let Connect = knex({
    client: 'mysql2',
    connection: {
        host : process.env.DATABASE_CONNECTION,
        user : process.env.DATABASE_USER,
        port: port,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_DATABASE,
        timezone: process.env.DATABASE_TZ,
    }
});


export {Connect}