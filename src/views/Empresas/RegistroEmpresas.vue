<template>
  <div style="max-height: 200%">
   <!--  <div class="row p-2 mx-0">
      <div class="col-12 align-self-center text-center">
        <div class="container d-flex justify-content-center mb-4"></div>

        <h1>Crear Imagen</h1>
      </div>
      <hr />
      <div class="row mx-0">
        <div class="col-12 col-md-6 text-star mx-0">
          <form
            @submit.prevent="subirimagen"
            @change="prevista"
            enctype="multipart/form-data"
          >
            <input type="file" ref="file" id="file" accept="image/*" required />
            &nbsp;

            <b-button
              class="mt-2"
              type="submit"
              id="colorid"
              @click="showAlert"
              onsubmit="setTimeout(function () { window.location.reload(); }, 10)"
            >
              <b-icon icon="cloud-upload" aria-hidden="true"></b-icon> Subir
              Imagen
            </b-button>
          </form>

          <p><b>Previsualizacion:</b></p>
          <br />
          <div v-if="image === ''"></div>
          <div>
            <img :src="image" alt="" height="400px" width="400px" />
          </div>
        </div>
      </div>
    </div> -->

    <!-- imagenes subir arriba -->

    <div class="container-fluid mt-4">
      <div class="row">
        <div id="tamaño-regis" class="container-fluid">
          <div class="text-center">
            <a href="/">
              <!--      <img class="resitro" src="./assets/login.png" /> -->
            </a>
          </div>
          <h1>Registro</h1>

          <form @submit.prevent="register">
            <label for="social">Razon Social</label>
            <strong style="color: red"> * </strong>
            <br />
            <input
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
              type="text"
              size="50"
              v-model="social"
              required
            />
            <!--   <br /> -->
            <!--  <label for="nombre">Nombre </label>
            <strong style="color: red"> * </strong>
            <br />
           <input    type="text"    class="col-xs-12 col-sm-12 col-md-12 col-lg-12"       size="90"    v-model="nombre"    required  /> -->
            <br />
            <label for="email">Email </label>
            <strong style="color: red"> * </strong>
            <br />
            <input
              type="email"
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
              size="90"
              v-model="email"
              required
            /><br />
            <label for="celular">Celular </label>
            <strong style="color: red"> * </strong>
            <br />
            <input
              type="text"
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
              size="50"
              v-model="celular"
              required
            /><br />

            <div v-if="error">
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
            </div>

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
            <br />

            <b-button
              type="submit"
              @click="showAlert"
              id="color"
              block
              variant="dark"
              onsubmit="setTimeout(function () { window.location.reload(); }, 10)"
            >
              Ingresar
            </b-button>
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
  name: "Registro",
  data() {
    return {
      social: "",
      /*  nombre: "", */
      email: "",
      celular: "",
      error: false,
      loading: false,
        subirimage: "",
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },

  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  /*   prevista(e) {
      this.image = URL.createObjectURL(e.target.files[0]);
      this.subirimage = e.target.files[0];
    }, */
    register() {
      this.error = false;
      this.loading = false;
    const tokens = localStorage.getItem("token"); 
      axios
        .post(
          "http://localhost:1337/empresas/",


          {
              headers: {
                 
              'Authorization': 'Bearer'  + tokens,
             /*  "Content-Type": "multipart/form-data", */
          
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               social: this.social,
            /*  nombre: this.nombre, */
            email: this.email,
            celular: this.celular,
            })
           

          
          }
        )
        .then((response) => {
          this.loading = true;
         
          // this.$router.push('/registro')
        })

        .catch((err) => {
          console.log("Fallo");
           console.log(tokens);
          this.error = true;
        });
    },
  },
};
</script>
<style >
.registroprincipal {
  background: aqua;
}
#col_border {
  text-decoration: none;
  color: white;
}

#color {
  background: black;
}
.login__logo {
  width: 64px;
  height: 64px;
}
/*  #tamaño {
            width: 500px;
            max-height: 1000px;
            
        } */

#color {
  background: black;
  margin-bottom: 50px;
}

#tamaño-regis {
  margin-top: 100px;
  width: 500px;
  max-height: 1000px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background-color: rgb(255, 251, 251);
}
.resitro {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 64px;
  height: 64px;
}
/*  .fondo {
  
  
 
  
  
   background-image: url('https://images8.alphacoders.com/718/718915.jpg') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

} */
</style>