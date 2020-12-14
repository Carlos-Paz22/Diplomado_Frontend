<template>
  <div>
    <div class="container mt-4">
       <div class="row justify-content-between">
        <div class="col-6 col-sm-4 col-mg-4 col-lg-3"><h3>Mi empresa </h3></div>
        <div class="col-6 col-sm-4 col-mg-4 col-lg-3"><button class="btn btn-primary" v-if="mosemp" @click="$router.push('/crearempresa')">Crear Empresa</button></div>
      </div>
        
        <div class="row justify-content-around align-items-center mx-0 ">
          <div class="col-10 col-sm-6 col-md-4 col-lg-3" v-for = "imagen in imagenes" :key="imagen.id">
            <div class="card" >
              <div class="imgBx">
                <img :src="'http://localhost:1337'+imagen.logo.url">
              </div>
                <div class="details">
                <h5 class="card-title">{{imagen.social}}</h5>
                </div>
              </div>
              <div class="row justify-content-center py-2">
                <button class="btn btn-primary mr-1 ml-3" @click="editar(imagen.id)">Editar</button>
                <button class="btn btn-danger ml-1" @click="eliminar(imagen.id)">Eliminar</button>
              </div>
          </div>
        </div> 
    </div>
    <div>  

    </div>
  </div>



</template>

<script>
import axios from "axios";

export default {
  name: "Myperfil",
  data() {
    return {
      user: {},
      tags: [],
      imagenes:null,
      selectedFile: null,
      complete: true,
      nombre: "",
      empre:[],
      mosemp:true,
    };
  },

  mounted() {
    this.misimagenes();
   
      if(this.empre!='' && this.empre!=null)
      {
        this.mosemp=false
      }
  },

  methods: {
    salir() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/");
    },
    misimagenes() {
      axios
        .get("http://localhost:1337/empresas/my/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.imagenes = response.data;
          console.log(this.imagenes);
        });
        
      this.user = JSON.parse(localStorage.getItem("user"));
      //recuperar el token para la Auth
      //const tokenverificacion =
      fetch("http://localhost:1337/empresas/my/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          
          this.imagenes = data
          
        });
    },
    eliminar(id) {
      axios
        .delete("http://localhost:1337/empresas/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.misimagenes();
        });
    },
    editar(id){
      
    }

  },
};
</script>
<style >
.tam {
  width: 300px;
}
.letra {
  font: oblique bold 120% cursive;
  font-size: 56px;
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