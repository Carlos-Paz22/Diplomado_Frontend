<template>
  <div>
    <div class="flex-container mt-4">
      <div class="row mx-0">
        <div id="tamcrearcat" class="container-fluid">
          <h1 class="texttitulo">Crear Nueva categoria</h1>
          <form class="main" @submit.prevent="guardar">
            <label class="mr-2" for="nombre">Nombre</label>
            <input  class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2" type="text" v-model="nombre" /> <br>
           <b-button
              class="mt-2"
              type="submit"
              @click="showAlert"
              id="color"
              block
              variant="dark"
              onsubmit="setTimeout(function () { window.location.reload(); }, 10)"
            >
              Guardar
            </b-button>
          </form>
           <div v-if="loading">
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="success"
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
            >
              <p>Categoria creado Correctamente </p>
              <b-progress
                variant="success"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px"
              ></b-progress>
            </b-alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateCategoria",
  data() {
    return {
      nombre: "",
       loading: false,
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },

  methods: {

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    guardar() {
         this.loading = false;


      const tokenverificacion = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:1337/categorias",
          {
            nombre: this.nombre,
          },
          {
            headers: {
              Authorization: "Bearer " + tokenverificacion,
            },
          }
        )

        .then((response) => {
          this.loading= true
       redireccionar()
        });
         function redireccionar() {
        setTimeout("location.href='/categoria'", 3000);
      }
    },
    
  },
};
</script>

<style>
.main {
  margin-top: 50px;
}
  #tamcrearcat {
  
  margin-top: 50px;
  width: 600px;
  max-height: 1000px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background-color: rgb(255, 251, 251);
}
.texttitulo{
    color: #000;
}
</style>
