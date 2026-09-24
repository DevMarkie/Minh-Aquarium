import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Lazy-loaded pages
const HomePage    = () => import('./pages/HomePage.vue')
const ProductsPage = () => import('./pages/ProductsPage.vue')
const BlogPage    = () => import('./pages/BlogPage.vue')
const ServicesPage = () => import('./pages/ServicesPage.vue')
const CartPage    = () => import('./pages/CartPage.vue')
const LoginPage   = () => import('./pages/LoginPage.vue')
const NotFoundPage = () => import('./pages/NotFoundPage.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',         component: HomePage },
    { path: '/products', component: ProductsPage },
    { path: '/blog',     component: BlogPage },
    { path: '/services', component: ServicesPage },
    { path: '/cart',     component: CartPage },
    { path: '/login',    component: LoginPage },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
  ],
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

createApp(App).use(router).mount('#app')

