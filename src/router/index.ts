import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', redirect: '/index' },
    { path: '/index', name: 'index', component: () => import('../views/index/index.vue') },
    { path: '/rank', name: 'rank', component: () => import('../views/rank/index.vue') },
    { path: '/playlist', name: 'playlist', component: () => import('../views/playlist/index.vue') },
    { path: '/mvlist', name: 'mvlist', component: () => import('../views/mvlist/index.vue') },
    { path: '/artist', name: 'artist', component: () => import('../views/artist/index.vue') },
    { path: '/my', name: 'my', component: () => import('../views/my/index.vue') },
    { path: '/album', name: 'album', component: () => import('../views/album/index.vue') },
    { path: '/search', name: 'search', component: () => import('../views/SerchResult/index.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
