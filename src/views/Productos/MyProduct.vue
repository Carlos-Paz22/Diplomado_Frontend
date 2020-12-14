<template>
  <div>
    <div class="container mt-4">
      <div class="row mx-0 justify-content-between">
        <div class="col-6 col-sm-4 col-mg-4 col-lg-3"><h3>Mis productos </h3></div>
        <div class="col-6 col-sm-4 col-mg-4 col-lg-3"><button class="btn btn-primary" type="button" @click="$router.push('/crearproduct')">Crear producto</button></div>
      </div>
      <div class="row mx-0">
        <div class="col-12 col-sm-12 col-md-6 col-lg-4" v-for="items in galeria" :key="items.id">
          <Misproductos :items="items" v-if="moses"/>
          <a :href="`/product/${items.id}/edit`" class="format-null">
          <button class="btn btn-success" >Editar</button></a>
          <button class="btn btn-info" @click="eliminar(items.id)">Eliminar</button>
          <a :href="`/myproduct/${items.id}/${items.estado}/edit`" class="format-null">
          <button class="btn btn-secondary" @click="estados(items.estado)">{{items.estado}}</button></a>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Misproductos from "@/components/Misproductos.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Misproductos,
  },
  data() {
    return {
      
      galeria: [],
      user: {},
      tags: [],
      selectedFile: null,
      complete: true,
      nombre: "",
      moses:true,
      estado:'',
      valor:''
    };
  },

  mounted() {
    this.misimagenes();
    
    
     this.token = localStorage.getItem("token");
    this.id = this.$route.params.id;

    axios
      .get("http://localhost:1337/productos/" + this.id, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.estado = response.data.estado;
        console.log('Strapi '+this.estados)
        
      });
  },
  
  methods: {
      estados(){
        
        if(this.estado=='activo'){
          localStorage.setItem('estado','inactivo')
        }else{
          localStorage.setItem('estado','activo')
        }
        this.valor=localStorage.getItem('estado')
      axios
        .put(
          "http://localhost:1337/productos/" + this.id,{
            estado: this.valor,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response)
        });
          
        },
    misimagenes() {
      this.user = JSON.parse(localStorage.getItem("user"));
      //recuperar el token para la Auth
      //const tokenverificacion =
      fetch("http://localhost:1337/productos/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.galeria = data;
        });
    },
 

    eliminar(id) {
      axios
        .delete("http://localhost:1337/productos/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.misimagenes();
        });
    },

   
  },
};
</script>
<style >
.format-null{
  all: unset !important;
}
.tam {
  margin-top: 5px;
  width: 300px;
}

.btnhome {
    font-family: Lato, sans-serif;
  text-decoration: none;
width: 1000px;
  border: 5px solid #2c3e50;
  color: #2c3e50;
  display: block;
 
  font-size: 2rem;
  letter-spacing: 0.1rem;
  padding: 1rem;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
}

.btnhome::before {
  content: "";
  background-color: #E26A6A;
  box-shadow: 10px 10px 0 #F1C40F, 
              20px 20px 0 #3498DB;
  position: absolute;
  left: 0.25rem;
  top: 0.5rem;
  height: 102%;
  width: 102%;
  z-index: -1;
  transition: all 0.4s ease;
}

.btnhome:hover::before {
  box-shadow: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}


</style>