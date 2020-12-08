<template>
  <div class="row p-2  sticky-top mx-0">
    
    <hr />
    <div class="row mx-0 mt-4">
      <div class="col-12 col-md-6 text-star mx-0">
       
        <form
          @submit.prevent="subirimagen"
          @change="prevista"
          enctype="multipart/form-data"
        >
          <input type="file" ref="file" id="file" accept="image/*" required /> <br><br>

         <label for="social">Nombre empresa</label> <br>
          <input type="text" name="social" v-model="social"><br>
          <label for="email">Email Empresa</label><br>
           <input type="email" name="email" v-model="email"><br>
           <label for="celular">Celular Empresa</label><br>
           <input type="celular" name="celular" v-model="celular"><br>




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
            

          <b-button
          class="mt-2"
            type="submit"
            id="colorid"
            @click="showAlert"
            onsubmit="setTimeout(function () { window.location.reload(); }, 10)"
          >
            <b-icon icon="cloud-upload" aria-hidden="true"></b-icon> Enviar
            
          </b-button>

          
        </form>

         
        
        </div>
      </div>
      <div
        class="col-12 col-md-6 text-center justify-content-center mx-auto"
        style="height: 500px"
      >
        <p><b>Previsualizacion:</b></p>
        <br />
        <div v-if="image === ''"></div>
        <div>
          <img  :src="image" alt=""  height="400px" width="400px"/>
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
      social: '',
      email: "",
      celular:"",
      loading: false
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
    subirimagen() {

      this.loading = false
       
        this.alerta = false;
        const token = localStorage.getItem("token");
        var formData = new FormData();
        let data = { tags: this.checkedNames };
        formData.append("files.logo", this.subirimage);
        //formData.append("data", JSON.stringify(data));
        formData.append("data", JSON.stringify({
            social: this.social,
            email: this.email,
            celular: this.celular,
            

        }));

        console.log(this.subirimage);

        axios
          .post("http://localhost:1337/empresas", formData, {

           /*  nombre: this.nombre, */
             headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
              //  "Content-Type": "application/json",
            },
          },
               
         
           
         )
          .then((response) => {
            this.loading= true
        //    this.$router.push("/home");
          })
           .catch((err) => {
          console.log("Fallo");
          this.error = true;
        });
          
      
    },
  },
};
</script>

