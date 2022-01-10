import ErrorReturn from '../../helppers/serviceDefault/errorReturn';
import SuccessReturn from '../../helppers/serviceDefault/successReturn';
import CatalogoRepositories from '../repositories/CatalogoRepositories';


class CatalogoService {   
   
    async criar( ) {
        try{      
            SuccessReturn.result = await CatalogoRepositories.criar();                 
        }catch ( e: any ) {
            ErrorReturn.message = e.toString();
            return ErrorReturn;
        }
        return SuccessReturn;
    }
    

}

export default new CatalogoService();