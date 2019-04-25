import store from '@/store'
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

export interface IAjaxState {
    ajaxlist:any[]
}

@Module({dynamic:true,store,name:'ajaxlist'})
class AjaxList extends VuexModule implements IAjaxState {
    public ajaxlist: any[] = []

    @Action({commit: 'CLEAR_AJAX'})
    public ClearAJax() {
    }

    @Action({commit: 'ADD_AJAX'})
    public AddAjax(list: object) {
        return list
    }

    @Mutation
    private ADD_AJAX(ajax:object) {
        this.ajaxlist = [ajax, ...(this.ajaxlist || [])]
    }

    @Mutation
    private CLEAR_AJAX() {
        this.ajaxlist = []
    }
}

export const AjaxModule= getModule(AjaxList);
