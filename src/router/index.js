import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import RegUser from '../views/Users/Registro.vue';
import RegEmpresas from '../views/Empresas/RegistroEmpresas.vue'
import Myperfil from '../views/Users/Myperfil.vue'
import CrearEmpresa from '../views/Users/CrearEmpresa.vue'



Vue.use(VueRouter)

const routes = [
  {
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
  path: '/product',
  name: 'Product',
  component: Product,
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
