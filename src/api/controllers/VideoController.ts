import {Request, Response} from 'express';
import VideoService from '../services/VideoService';


class VideoController{

    async token(req:Request|any, res: Response){        
        const userId: string  = req.query.userId;
        const roomSid: string = req.query.roomSid;

        let retorno = await VideoService.token(userId, roomSid);

        return res.status(retorno.code).json(retorno);
    }

    async criarSala(req:Request|any, res: Response){        
        const uniqueName: string  = req.body.uniqueName;

        let retorno = await VideoService.criarSala(uniqueName);

        return res.status(retorno.code).json(retorno);
    }

    async encerrarSala(req:Request|any, res: Response){        
        const roomSid: string  = req.body.roomSid;

        let retorno = await VideoService.encerrarSala(roomSid);

        return res.status(retorno.code).json(retorno);
    }

    async listarSalas(req:Request|any, res: Response){

        let retorno = await VideoService.listarSalas();

        return res.status(retorno.code).json(retorno);
    }

    async buscarSala(req:Request|any, res: Response){
        let nomeOuSid = req.params.nomeOuSid;

        let retorno = await VideoService.buscarSala(nomeOuSid);

        return res.status(retorno.code).json(retorno);
    }


    //******************Gravações******************************** */

    async listar(req:Request|any, res: Response){

        let retorno = await VideoService.listar();

        return res.status(retorno.code).json(retorno);
    }

    async getBySid(req:Request|any, res: Response){        
        const recordingSid: string  = req.params.recordingSid;

        let retorno = await VideoService.getBySid(recordingSid);

        return res.status(retorno.code).json(retorno);
    }

    async getByGroup(req:Request|any, res: Response){
        let groupingSid = req.query.groupingSid;

        let retorno = await VideoService.getByGroup(groupingSid);
        return res.status(retorno.code).json(retorno);
    }
    



    
  
    //renderizar telas ejs
    async prestador(req:Request|any, res: Response){

        res.render('prestador')
    }

    async espectador(req:Request|any, res: Response){

        res.render('espectador')
    }

   
}
   

export default new VideoController();