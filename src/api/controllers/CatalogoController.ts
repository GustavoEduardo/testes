import {Request, Response} from 'express';
import CatalogoService from '../services/CatalogoService';


class CatalogoController{
   

    async criar(req:Request|any, res: Response){
        let itens = req.body;   

        let retorno = await CatalogoService.criar();

        return res.status(retorno.code).json(retorno);
    }

    
   
}
   

export default new CatalogoController();