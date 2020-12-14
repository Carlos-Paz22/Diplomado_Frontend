<template>
  <div>
    <nav class="navbar row m-0 justify-content-around" style="background-color: #ffffff;">
     <ul class="nav">
       <li class="mr-2 ml-2 pointer">
    <a :href="`/`" class="pointer" title="Unsplash Home">
      <img class="logo" src="https://unsplash.com/safari-pinned-tab.svg" alt="Unsplash" style="height:30px">
    </a>
        <button class=" format-null pointer" style="margin-left:10px !important;" :href="`/`" title="Home - Unsplash">
      <a class="format-null" :href="`/`">
      <div>
      <!--   <span style="font-size:16px; font-weight: bold; position: relative;top: -3px;">Unsplash</span> -->
      </div>
    <!--   <span style="font-size:13px; position:relative; top:-13px; ">Photos for everyone</span> -->
      </a>
      </button>
     
  </li>
        <li class="nav-item div-search">
        <button class="format-null button-search">
          <i class="fa fa-search" style="color: #767676; margin-left:10px"></i>
        </button>
        <input type="search" class="input-search format-null" v-model="search" placeholder="Search food">          
      </li>
      <li class="nav-it li-second ml-2 join py-1" style="border-left: 1px solid #d1d1d1;height:30px;" v-if="nomos" >
        <button class="btn btn-sm btn-default" @click="$router.push('/login')" style="color:#767676;">Ingresar</button>
      </li>
      <li class="nav-it li-second ml-2 join py-1" style="border-left: 1px solid #d1d1d1;height:30px;" v-if="nomos" >
        <button class="btn btn-sm btn-default" @click="$router.push('/registro')" style="color:#767676;">Crear cuenta</button>
      </li>
      <li class="nav-it li-second ml-2  join py-1" style="border-left: 1px solid #d1d1d1;height:30px;" v-if="mos">
        <button class="btn btn-sm btn-default" @click="$router.push('/myproduct')" style="color:#767676;">Mis Productos</button>
      </li>
      <li class="nav-it li-second ml-2  join py-1" style="border-left: 1px solid #d1d1d1;height:30px;" v-if="mos">
        <button class="btn btn-sm btn-default" @click="$router.push('/categoria')" style="color:#767676;">Mis Categorias</button>
      </li>
      <li class="nav-it li-second ml-2  join py-1" style="border-left: 1px solid #d1d1d1;height:30px;" v-if="mos">
        <button class="btn btn-sm btn-default" @click="$router.push('/')" style="color:#767676;">Destacados</button>
      </li>
     
      
      
    <li class="nav-it li-second" v-if="mos" >
        <div class="btn-group dropleft ml-3" >
            <img src="@/assets/avatar.png" data-toggle="dropdown" class="avatar pointer">
          
          <ul class="dropdown-menu" style="background-color:black;text-color:#ffffff !important;top:42px;right:0px;width:200px">
            <button class="dropdown-item collap1" type="button" @click="$router.push('/myperfil')">View profile</button>
            <button class="dropdown-item collap1" type="button" @click="$router.push('/crearproduct')">Crear producto</button>
            <button class="dropdown-item collap1" type="button" @click="$router.push('/categoria/create')">Crear Categoria</button>
            <button class="dropdown-item collap1" type="button">Account settings</button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item collap1" @click="salir" type="button" >Logout @{{user.username}}</button>
            </ul>
        </div>
      </li>
     </ul>
     
    </nav>
    <router-view/>
  </div>
</template>
<script>
import Galeria from "@/components/Galeria.vue";
import axios from "axios";
import debounce from "debounce";
export default {
  name: "Home",
  components: {
    Galeria,
  },
  data() {
    return {
      galeria: [],
      user: {},
      
      imagenes: null,
      slide: 0,
      sliding: null,
      tags: [],
      checkedNames: "",
      buscar: "",
      url:"",
       alerta: false,
       search: "",
    user:"",
    mos:false,
            nomos:true,
    };
  },
  mounted() {
    this.user =JSON.parse(localStorage.getItem('user'));
    if (this.user!=null) {
        this.mos=true;
        this.nomos=false;
      }
    this.traerimagen();
    
  },
  methods:{
    salir(){
        
        localStorage.removeItem('token'),
        localStorage.removeItem('user'),
        window.location.href = '/'
      },
    traerimagen() {
      axios
        .get("http://localhost:1337/empresas?_sort=id%3ADESC", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.imagenes = response.data;
          console.log(this.imagenes);
        });
    },
    
  }
  
};
</script>
<style>
  .pointer {
	cursor: pointer !important;
}

</style>
