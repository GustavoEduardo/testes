import {Request, Response} from 'express';
import CatalogoService from '../services/CatalogoService';


class CatalogoController{
   

    async atulaizar(req:Request|any, res: Response){
        let {requests} = req.body;
        let retorno = await CatalogoService.atulaizar(requests);

        return res.status(retorno.code).json(retorno);
    }

    
   
}
   

export default new CatalogoController();