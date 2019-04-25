import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
    mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
            meta: { hidden: true }
        },
        {
            path: '/404',
            component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
            meta: { hidden: true }
        },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            name: 'Dashboard',
            meta: { hidden: true },
            children: [{
                path: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
            }]
        },
        {
            path: '/category',
            component: Layout,
            redirect: '/category/index',
            name: 'Category',
            meta: { title: '分类管理', icon: 'category' },
            children: [{
                path: 'index',
                meta: { title: '分类管理', icon: 'category' },
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/category/index.vue')
            }]
        },
        {
            path: '/news',
            component: Layout,
            redirect: '/news/index',
            name: 'News',
            meta: { title: '内容管理', icon: 'news' },
            children: [{
                path: 'index',
                meta: { title: '内容管理', icon: 'news' },
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/news/index.vue')
            }]
        },

        {
            path: 'external-link',
            component: Layout,
            children: [
                {
                    path: 'http://localhost:3000',
                    meta: { title: 'Web页', icon: 'link' }
                }
            ]
        },
        {
            path: '*',
            redirect: '/404',
            meta: { hidden: true }
        }
    ]
})
