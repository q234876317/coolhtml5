import {BaseApi} from './baseapi';

class NewsApi extends BaseApi{
    constructor(){
        super('news')
    }
}

const newsApi=new NewsApi()
export default newsApi
