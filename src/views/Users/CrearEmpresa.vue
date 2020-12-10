<template>
  <div>
    <div class="container-fluid mt-4">
      <div class="row">
        <div id="tamaño-regis" class="container-fluid">
          <div class="text-center">
            <a href="/">
              <!--      <img class="resitro" src="./assets/login.png" /> -->
            </a>
          </div>
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
            <div>
              <img :src="image" alt="" height="400px" width="400px" />
            </div>
            <label for="social">Nombre social de la empresa</label> <br />
            <input   class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" v-model="social" /> <br />
            <label for="email">Emaill de la empresa</label> <br />
            <input   class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="email" v-model="email" /> <br />
            <label for="celular">Celular de la empresa</label> <br />
            <input   class="col-xs-12 col-sm-12 col-md-12 col-lg-12" type="text" v-model="celular" /> <br />
              
            <!--    <div v-if="error">
              <div class="mt-2">
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  variant="danger"
                  @dismissed="dismissCountDown = 0"
                  @dismiss-count-down="countDownChanged"
                >
                  <p><strong>Error</strong> Usuario / Correo Invalido</p>
                  <b-progress
                    variant="danger"
                    :max="dismissSecs"
                    :value="dismissCountDown"
                    height="4px"
                  ></b-progress>
                </b-alert>
              </div>
            </div> -->

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
            <button type="submit" id="color" class=" mt-2 btn btn-dark btn-lg btn-block">
              Registrarse
            </button>
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
  /*   mounted() {
    axios.get("http://localhost:1337/categorias/me",{

         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
    }).then((response) => {
      
      this.cat = response.data;
    });
  }, */
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
      let data = { tags: this.checkedNames };
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

      console.log(this.subirimage);

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
