import ErrorReturn from '../../helppers/serviceDefault/errorReturn';
import SuccessReturn from '../../helppers/serviceDefault/successReturn';
import VideoRepositories from '../repositories/VideoRepositories';
import 'dotenv/config';
//client SDK
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN
// const client = require('twilio')(accountSid, authToken);

class VideoService {   
    //sdk
    async token(userId: string, roomSid: string) {
        try{      
            SuccessReturn.result = await VideoRepositories.token(userId, roomSid);                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }

     //******************Salas******************************** */
    async criarSala(uniqueName: string) {
        try{      
            SuccessReturn.result = await VideoRepositories.criarSala(uniqueName);          

            }catch ( e: any ) {
                ErrorReturn.message = e.toString();
                return ErrorReturn;
            }
            return SuccessReturn;
    }

    async encerrarSala(roomSid: string) {
        try{
            SuccessReturn.result = await VideoRepositories.encerrarSala(roomSid); 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }

    async listarSalas() {
        try{      
            SuccessReturn.result = await VideoRepositories.listarSalasAtivas();                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }

    async buscarSala(nomeOuSid: string) {
        try{      
            SuccessReturn.result = await VideoRepositories.buscarSala(nomeOuSid);                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }  
    


    //******************Gravações******************************** */
    async listar() {
        try{      
            SuccessReturn.result = await VideoRepositories.listar();                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }

    async getBySid(recordingSid: string) {
        try{      
            SuccessReturn.result = await VideoRepositories.getBySid(recordingSid);                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }

    async getByGroup(groupingSid: string) {
        try{
            SuccessReturn.result = await VideoRepositories.getByGroup(groupingSid);                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }



}

export default new VideoService();