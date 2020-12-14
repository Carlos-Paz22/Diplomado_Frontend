<template>
<div>
  <section>
 <div class="row justify-content-between">
   <div class="col-6 col-sm-4 col-mg-4 col-lg-3"><h2>Mis Categorias</h2></div>
   <div class="col-6 col-sm-4 col-mg-4 col-lg-3"><button class="btn btn-primary" type="button" @click="$router.push('/categoria/create')">Crear Categoria</button></div>
  </div>
  <div class="tbl">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acción</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td class="text-dark">{{ categoria.nombre }}</td>
          <td> 
            <button class="btn btn-"></button>
          <a  class="mr-2" :href="`/categorias/${categoria.id}/edit`"> <b-button variant="warning">Editar</b-button></a>
          <a href="#" @click="eliminar(categoria.id)"> <b-button variant="danger">Eliminar</b-button></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>




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

<style >
table{
  width:100%;
  table-layout: fixed;
}
.tbl-header{
  background-color: rgba(255,255,255,0.3);
 }
.tbl-content{
  
  overflow-x:auto;
  margin-top: 0px;
  
}
.tbl-content2{
  
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgb(148, 148, 148);
}
th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 15px;
  font-weight: bold;
  background-color: white;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
}
td{
  background-color: white;
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 19px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  
}


/* demo styles */

@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);

section{
  margin: 50px;
}


/* follow me template */
.made-with-love {
  margin-top: 40px;
  padding: 10px;
  clear: left;
  text-align: center;
  font-size: 10px;
  font-family: arial;
  color: #fff;
}
.made-with-love i {
  font-style: normal;
  color: #F50057;
  font-size: 14px;
  position: relative;
  top: 2px;
}
.made-with-love a {
  color: #fff;
  text-decoration: none;
}
.made-with-love a:hover {
  text-decoration: underline;
}


/* for custom scrollbar for webkit browser*/

::-webkit-scrollbar {
    width: 6px;
} 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
} 
::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}
</style>