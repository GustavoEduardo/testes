import { Router } from 'express';
import Controller from '../api/controllers/CatalogoController';

const routes = Router();
routes.route('/catalogo-criar').post(Controller.criar);
//routes.route('/catalogo-atualizar').get(Controller.atualizar);


export default routes;