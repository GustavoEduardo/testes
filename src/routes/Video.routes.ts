
import { Router } from 'express';
import Controller from '../api/controllers/VideoController';

const routes = Router();
 //******************Salas******************************** */
routes.route('/token').get(Controller.token);
routes.route('/video/sala/criar').post(Controller.criarSala);
routes.route('/video/sala/encerrar').post(Controller.encerrarSala);
routes.route('/video/sala').get(Controller.listarSalas);
routes.route('/video/sala/:nomeOuSid').get(Controller.buscarSala);

 //******************Gravações******************************** */
routes.route('/video/gravacao').get(Controller.listar);
routes.route('/video/gravacao/recordingsid/:recordingSid').get(Controller.getBySid);
routes.route('/video/gravacao/groupingsids').get(Controller.getByGroup);//sid do grupo ou participante


//renderizar front ejs
routes.route('/video-prestador').get(Controller.prestador)
routes.route('/video-espectador').get(Controller.espectador)



export default routes;