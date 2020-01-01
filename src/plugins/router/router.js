import Vue from 'vue';
import Router from 'vue-router';
import authGuard from './authGuard.js';
import home from '@/views/Home.vue';
import NotFoundComponent from '@/views/notFound.vue';
import SignIn from '@/views/signIn.vue';
import SignUp from '@/views/signUp.vue';
import Systemx from '@/views/system.vue';
import Dashboard from '@/views/system/dashboard.vue';
import Ask from '@/views/system/askall.vue';
import AskallID from '../../views/system/askallid';
import Users from '@/views/system/user.vue';
import Asked from '@/views/system/asked.vue';
import Responses from '@/views/system/responses.vue';
import Brands from '@/views/system/brands.vue';
import Models from '@/views/system/models.vue';
import Parts from '@/views/system/parts.vue';
import Profile from '@/views/system/profile.vue';
import Address from '@/views/system/address.vue';
import Config from '@/views/system/config.vue';
import Search from '@/views/system/search.vue';
import Help from '@/views/system/help.vue';
import askID from '@/views/system/askid';
import LocaleZ from '@/views/system/locale';
import axios from 'axios';

Vue.use(Router);

export default new Router({
    // mode: "history",
    base: axios.defaults.baseURL,
    routes: [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/system',
        redirect: {
            name: 'resumen'
        },
        component: Systemx,
        children: [{
            path: 'locale',
            name: 'localz',
            component: LocaleZ,
            beforeEnter: authGuard,
            children: [{
                name: 'localz1',
                path: ':value',
                params: true,
                beforeEnter: authGuard
            }]
        },
        {
            path: 'dashboard',
            name: 'resumen',
            component: Dashboard,
            beforeEnter: authGuard
        },
        {
            path: 'ask',
            name: 'ask',
            component: Ask,
            beforeEnter: authGuard
        },
        {
            path: 'users',
            name: 'users',
            component: Users,
            beforeEnter: authGuard
        },
        {
            path: 'asked',
            name: 'asked',
            component: Asked,
            beforeEnter: authGuard,
            children: [{
                path: ':askid',
                name: 'askfromid',
                component: askID,
                params: true,
                beforeEnter: authGuard
            }]
        },
        {
            path: 'askedall',
            name: 'askedall',
            component: Ask,
            beforeEnter: authGuard,
            children: [{
                path: ':askidall',
                name: 'askfromidall',
                component: AskallID,
                params: true,
                beforeEnter: authGuard
            }]
        },
        {
            path: 'responses',
            name: 'response',
            component: Responses,
            beforeEnter: authGuard
        },
        {
            path: 'brands',
            name: 'brands',
            component: Brands,
            beforeEnter: authGuard
        },
        {
            path: 'models',
            name: 'models',
            component: Models,
            beforeEnter: authGuard
        },
        {
            path: 'parts',
            name: 'parts',
            component: Parts,
            beforeEnter: authGuard
        },
        {
            path: 'profile',
            name: 'profile',
            component: Profile,
            beforeEnter: authGuard
        },
        {
            path: 'address',
            name: 'address',
            component: Address,
            beforeEnter: authGuard
        },
        {
            path: 'config',
            name: 'config',
            component: Config,
            beforeEnter: authGuard
        },
        {
            path: 'search',
            name: 'search',
            component: Search,
            beforeEnter: authGuard
        },
        {
            path: 'help',
            name: 'ayuda',
            component: Help,
            beforeEnter: authGuard
        },
        {
            path: '*',
            component: Dashboard
        }
        ],
        beforeEnter: authGuard
    },
    {
        path: '*',
        component: NotFoundComponent
    }
    ]
});