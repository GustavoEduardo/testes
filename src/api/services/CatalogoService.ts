import ErrorReturn from '../../helppers/serviceDefault/errorReturn';
import SuccessReturn from '../../helppers/serviceDefault/successReturn';
import CatalogoRepositories from '../repositories/CatalogoRepositories';


class CatalogoService {   
   
    async atulaizar(requests: Array<object>) {
        try{      
            SuccessReturn.result = await CatalogoRepositories.atulaizar(requests);                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }
    

}

export default new CatalogoService();