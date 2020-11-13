import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import RegUser from '../views/Users/Registro.vue';
import RegEmpresas from '../views/Empresas/RegistroEmpresas.vue'
import Myperfil from '../views/Users/Myperfil.vue'
import CrearEmpresa from '../views/Users/CrearEmpresa.vue'
import CrearProduct from '../views/Productos/CrearProduct.vue'
import MyProduct from '../views/Productos/MyProduct.vue'
import EditarProduct from '../views/Productos/EditarProduct.vue'
import CreateCategoria from '../views/categorias/CreateCategoria.vue'
import EditCategoria from '../views/categorias/EditCategoria.vue'
import Categoria from '../views/categorias/Categoria.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login


    },
    {

        path: '/registro',
        name: 'Registro',
        component: RegUser
    },
    {

        path: '/registroempresas',
        name: 'RegistroEmpresas',
        component: RegEmpresas,
        meta: {
            auth: true
        }
    },
    {

        path: '/myperfil',
        name: 'Myperfil',
        component: Myperfil,
        meta: {
            auth: true
        }
    },
    {

        path: '/crearempresa',
        name: 'CrearEmpresa',
        component: CrearEmpresa,
        meta: {
            auth: true
        }
    },

    {

        path: '/crearproduct',
        name: 'CrearProduct',
        component: CrearProduct,
        meta: {
            auth: true
        }

    },
    {

        path: '/myproduct',
        name: 'Myproduct',
        component: MyProduct,
        meta: {
            auth: true
        }

    },
    {
        //: los puintos son por que varian los id
        path: '/product/:id/edit',
        name: 'EditarProduct',
        component: EditarProduct,
        meta: {
            auth: true
        }
    },
    {
        path: '/categoria/create',
        name: 'CreateCategoria',
        component: CreateCategoria,
        meta: {
            auth: true
        }
    },
    {
        //: los puintos son por que varian los id
        path: '/categorias/:id/edit',
        name: 'EditCategoria',
        component: EditCategoria,
        meta: {
            auth: true
        }
    },

    {
        path: '/categoria',
        name: 'Categoria',
        component: Categoria,
        meta: {
            auth: true
        }



    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    //si en la ruta que estamos navengando tiene Auth
    if (to.matched.some((record) => record.meta.auth)) {
        console.log('Cambiando ruta')
            //Requiere Auth
        const token = localStorage.getItem('token')
        if (!token) {
            next('/login')
        }
    }
    next()
})
export default router