<template>
  <div>

     <div class="flex-container mt-4">
       <div class="row mx-0">
          <div id="tameditar" class="container-fluid">
               <h1 class="texttitulo">Editar Producto</h1>

      <form @submit.prevent="guardar" enctype="multipart/form-data">
        <label for="nombre">Nombre</label> <br />
        <input  class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" name="nombre" v-model="nombre" /><br />
        <label for="descripcion">Descripcion</label><br />

        <textarea   class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" name="descripcion" cols="23" v-model="descripcion">
        </textarea
        ><br />
        <label for="celular1">Celular</label><br />
        <input  class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" name="celular1" v-model="celular1" /><br />
        <label for="precio">Precio</label><br />
        <input  class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" name="precio" v-model="precio" /><br />

        <!--   <label for="">Actualizar Logo</label>
  <input type="file" ref="file" id="file" accept="image/*"  /> <br> <br> -->

        <div v-if="loading">
          <div class="mt-2">
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="success"
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
            >
              <p><strong>Success !</strong> Producto Actualizado Correctamente</p>
              <b-progress
                variant="success"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px"
              ></b-progress>
            </b-alert>
          </div>
        </div>

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



          </div>

       </div>
      </div>


    <div class="container">
     
    </div>
  </div>
</template>

<script>
import Misproductos from "@/components/Misproductos.vue";
import axios from "axios";

export default {
  name: "EditarProduct",
  components: {
    Misproductos,
  },
  data() {
    return {
      nombre: "",
      descripcion: "",
      celular1: "",
      precio: "",
      loading: false,
      dismissSecs: 2,
      dismissCountDown: 0,
      galeria: [],
    };
  },

  mounted() {
    //    this.misimagenes();

    this.token = localStorage.getItem("token");
    this.id = this.$route.params.id;

    axios
      .get("http://localhost:1337/productos/" + this.id, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.nombre = response.data.nombre;
        this.descripcion = response.data.descripcion;
        this.celular1 = response.data.celular1;
        this.precio = response.data.precio;
      });
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

      axios
        .put(
          "http://localhost:1337/productos/" + this.id,
          {
            nombre: this.nombre,
            descripcion: this.descripcion,
            celular1: this.celular1,
            precio: this.precio,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((response) => {
          this.loading = true;
         redireccionar()
        });
          function redireccionar() {
        setTimeout("location.href='/myproduct'", 3000);
      }
    },
   
  },
};
</script>

<style>
  #tameditar {
  margin-top: 50px;
  width: 500px;
  max-height: 1000px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background-color: rgb(255, 251, 251);
}
</style>
