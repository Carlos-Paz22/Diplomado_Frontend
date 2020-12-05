<template>

<div>
    <div class="container d-flex justify-content-center mb-4">
        
<li href="#" class="btnhome2">

 <router-link to="/crearproduct" id="col_border"
          ><h1 class="text-align-center">Volver</h1></router-link
        >
    
  </li>
        </div>



  <h1>Listado de Categorias</h1>
  <a href="/categoria/create">Crear </a> <br />

 
  <table>
    <thead>
      <tr>
        <td>ID</td>
        <td>Nombre</td>
        <td>Acciones</td>
      
      </tr>
    </thead>
    <tbody>
      <tr v-for="categoria in categorias" :key="categoria.id">
        <td>{{ categoria.id }}</td>
        <td>{{ categoria.nombre }}</td>
        <td>
          <a :href="`/categorias/${categoria.id}/edit`">Editar</a>
          <a href="#" @click="eliminar(categoria.id)">Eliminar</a>
        </td>
      </tr>
    </tbody>
  </table>

</div>
  
</template>

<script>
import axios from "axios";
import debounce from "debounce";
export default {
  name: "Categoria",
  data() {
    return {
      categorias: [],
      
    };
  },

  mounted() {
    
    this.traerCategorias();
  },
  /*Para buscar*/
 
  methods: {
    traerCategorias() {
      axios
        .get("http://localhost:1337/categorias/me", {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.categorias = response.data;
        });
    },

    eliminar(id) {
      axios
        .delete("http://localhost:1337/categorias/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.traerCategorias();
        });
    },
   
  },
};
</script>