import request from '@/utils/request';
export interface UpdateInfo {
    id: string,

    [propName: string]: any;
}
export class BaseApi {
    constructor(protected api: string) {
        this.api = `/back/${this.api}`
    }
    all() {
        return request({
            url: `${this.api}/all`,
            method: 'get'
        })
    }

    query(pageindex: number, pagesize: number = 10) {
        return request({
            url: `${this.api}/query`,
            method: 'get',
            params: {
                pageindex, pagesize
            }
        })

    }

    count() {
        return request({
            url: `${this.api}/count`,
            method: 'get'
        })
    }

    getbyid(id: string) {
        return request({
            url: `${this.api}/getbyid`,
            method: 'get',
            params: {id}
        })
    }

    del(id: string) {
        return request({
            url: `${this.api}/delete`,
            method: 'post',
            data: {id}
        })
    }

    add(obj: object) {
        return request({
            url: `${this.api}/add`,
            method: 'post',
            data: obj
        })
    }

    update(updateInfo: UpdateInfo) {
        return request({
            url: `${this.api}/update`,
            method: 'post',
            data: updateInfo
        })
    }

    commonupdate(updateInfo: UpdateInfo){
        if(updateInfo.id==''){
            delete updateInfo.id
            return this.add(updateInfo)
        }
        else{
            return this.update(updateInfo)
        }
    }
}
