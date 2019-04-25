import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import { Route } from 'vue-router';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to: Route, from: Route, next: any) => {
    NProgress.start();
    let token=getToken()
    if (token) {
        if (to.path === '/login') {
            next({path: '/'});
            NProgress.done(); // If current page is dashboard will not trigger afterEach hook, so manually handle it
        } else {
            next();
        }
    } else {
        // 直接跳转，只有管理员权限
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`); // Redirect to login page
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
