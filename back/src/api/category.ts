import {BaseApi} from './baseapi';

class CategoryApi extends BaseApi{
    constructor(){
        super('category')
    }
}

const categoryApi=new CategoryApi()
export default categoryApi
