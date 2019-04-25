import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators'
import { login, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'

export interface IUserState {
    token: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public token: string = getToken() as string;

    @Action({commit: 'SET_TOKEN'})
    public async Login(userInfo: { username: string, password: string }) {
        const username = userInfo.username.trim()
        const {data} = await login(username, userInfo.password)
        setToken(data.token)
        return getToken()
    }

    @Action({commit: 'SET_TOKEN'})
    public async FedLogOut() {
        removeToken()
        return ''
    }

    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token
    }
}
export const UserModule = getModule(User)
