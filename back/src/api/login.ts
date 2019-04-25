import request from '@/utils/request';

export const login = (username: string, password: string) =>
    request({
        url: '/back/user/login',
        method: 'post',
        data: {
            name: username,
            password,
        },
    });

export const logout = () =>
    request({
        url: '/back/user/logout',
        method: 'post',
    });
