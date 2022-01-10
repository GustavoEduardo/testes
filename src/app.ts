import express from 'express';
import routes from './routes';
const app = express();

app.use(express.json());
/**
 * routes
 */
app.use('', routes);

app.set('view engine', 'ejs');
app.use(express.static("public"));




export default app; 