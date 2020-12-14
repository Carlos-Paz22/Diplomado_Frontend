<template>
  <div>
    <div class="container-fluid mt-4">
      <div class="row">
        <div id="tamaño-regis" style="color:white" class="container-fluid text-dark text-center ">
          <h1 class="color_reg">Registro</h1>

          <form
            @submit.prevent="register"
            enctype="multipart/form-data"
            @change="prevista"
          >
            <input type="file" ref="file" id="file" accept="image/*" required />
            &nbsp;
            <p><b>Previsualizacion:</b></p>
            <br />
            <div v-if="image === ''"></div>

            <div v-else>
              <div class="row justify-content-center">
                <img class="imgrespon" :src="image" alt=""/>
              </div>
            </div>
           
            <label for="social">Nombre social de la empresa</label>
            <strong style="color: red"> * </strong>
            <input   class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" v-model="social" /> <br />
            <label for="email">Emaill de la empresa</label> 
            <strong style="color: red"> * </strong>
            <input   class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="email" v-model="email" /> <br />
            <label for="celular">Celular de la empresa</label> 
            <strong style="color: red"> * </strong>
            <input   class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" v-model="celular" /> <br />
            <div v-if="loading">
              <div class="mt-2">
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  variant="success"
                  @dismissed="dismissCountDown = 0"
                  @dismiss-count-down="countDownChanged"
                >
                  <p><strong>Success !</strong> Se Registro Correctamente</p>
                  <b-progress
                    variant="success"
                    :max="dismissSecs"
                    :value="dismissCountDown"
                    height="4px"
                  ></b-progress>
                </b-alert>
              </div>
            </div>
            <div class="row justify-content-center">
              <button type="submit" id="color" class=" mt-2 btn btn-dark btn-lg">
              Registrarse
            </button>
            </div>
          </form>
          <div id="mensaje"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CargaImagen",
  data() {
    return {
      cat: [],
      checkedNames: [],
      image: "",
      subirimage: "",
      alerta: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      social: "",
      email: "",
      celular: "",
      loading: false,
    };
  },
    mounted() {
    
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    prevista(e) {
      this.image = URL.createObjectURL(e.target.files[0]);
      this.subirimage = e.target.files[0];
    },
    register() {
      
      this.loading = false;
      this.alerta = false;
      const token = localStorage.getItem("token");
      var formData = new FormData();
      var data = { tags: this.checkedNames};
      formData.append("files.logo", this.subirimage);
      //formData.append("data", JSON.stringify(data));
      formData.append(
        "data",
        JSON.stringify({
          social: this.social,
          email: this.email,
          celular: this.celular,
        })
      );

      axios
        .post("http://localhost:1337/empresas", formData, {
          /*  nombre: this.nombre, */
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
            //  "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.loading = true;
          window.location.href='/myperfil'
          //    this.$router.push("/home");
        })
        .catch((err) => {
          console.log("Fallo");
          this.err = true;
        }); 
         
    },
  },
};
</script>

<style>
.color_reg {
  color: black;
}
</style>
