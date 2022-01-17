import { Router } from 'express';
import Video from './Video.routes';
import Catalogo from './Catalogo.routes';


const routes = Router();

routes.use(Video);
routes.use(Catalogo);
export default routes;