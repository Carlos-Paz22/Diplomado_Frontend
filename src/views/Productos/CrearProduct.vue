<template>
  <div>
    <div class="flex-container mt-4">
      <div class="row mx-0">
        <div id="tamcrearpro" class="container-fluid">
          <h1 class="texttitulo"> Crear producto</h1>
          <form
            @submit.prevent="subirimagen"
            @change="prevista"
            enctype="multipart/form-data"
          >
            <label class="mt-4" for="">Imagen</label> <br />
            <input type="file" ref="file" id="file" accept="image/*" required /> <br />
            <br />

            <p><b>Previsualizacion</b></p>
            <br />
            <div v-if="image === ''"></div>
            <div class="row justify-content-center">
              <img class="imgrespon" :src="image" />
            </div>

            <label for="nombre">Nombre</label> <br />
            <input class="col" type="text" name="nombre" v-model="nombre" /><br />
            <label for="descripcion">Descripcion</label><br />

            <textarea
              class="col"
              name="descripcion"
              id=""
              cols="23"
              v-model="descripcion"
            ></textarea
            ><br />

            <!--   <input type="text" name="descripcion" v-model="descripcion" /><br /> -->
            <label for="celular1">Celular</label><br />
            <input class="col" type="text" name="celular1" v-model="celular1" /><br />
            <label for="precio">Precio</label><br />
            <input class="col" type="text" name="precio" v-model="precio" /><br />
            <label for=""> Categoria</label>
          <div v-if="cat == ''">
          <b-alert show variant="warning">No tiene categorias credadas</b-alert>
        </div>
        <div v-else>
           <div class="tbl-content2">
              <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                  <tr v-for="tag in cat" :key="tag.id">
                    <td>
                      <label class="custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          :id="tag.nombre"
                          :value="tag.id"
                          v-model="checkedNames"
                        />
                        <span class="checkmark"></span>
                      </label>
                    </td>

                    <td>
                      <label class="ml-2" :for="tag.nombre">{{ tag.nombre }}</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>

            
        <div v-if="alerta === true">
          <div class="mt-2">
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="danger"
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
            >
              <p><strong>Error</strong> Seleccione una o mas categorias</p>
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
              <p><strong>Correcto</strong> Producto creado correctamente</p>
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
              class="mt-2 mb-4"
              type="submit"
              @click="showAlert"
              id="colorbuton"
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

    <div class="row mx-0">
      <div class="col-12 col-md-6 text-star mx-0">
       

    
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
      nombre: "",
      descripcion: "",
      celular1: "",
      precio: "",
      loading: false,
    };
  },
  mounted() {
    const tokenverificacion = localStorage.getItem("token");
    axios
      .get("http://localhost:1337/categorias/me", {
        headers: {
          Authorization: "Bearer " + tokenverificacion,
        },
      })
      .then((response) => {
        this.cat = response.data;
      });
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
    subirimagen() {
      this.loading = false;

      if (this.checkedNames.length == 0) {
        this.alerta = true;
      } else {
        this.alerta = false;
        const token = localStorage.getItem("token");
        var formData = new FormData();

        let data = { cat: this.checkedNames };
        formData.append("files.imagen", this.subirimage);

        formData.append(
          "data",
          JSON.stringify({
            nombre: this.nombre,
            descripcion: this.descripcion,
            celular1: this.celular1,
            precio: this.precio,
            categorias: this.cat,
            categorias: this.checkedNames,
          })
        );

        console.log(this.subirimage);

        axios
          .post("http://localhost:1337/productos", formData, {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
           
            this.loading = true;
            redireccionar()
          });
            function redireccionar() {
        setTimeout("location.href='/myproduct'", 3000);
      }
      }
    },
  },
};
</script>

<style>
.colorsub {
  background-color: green;
}
#colorid {
  background: green;
}
/* https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png 
*/
.custom-checkbox {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.custom-checkbox .checkmark {
  width: 100%;
  height: 100%;
  border: 2px solid #222;
  display: inline-block;
  border-radius: 3px;
  background: #222
    url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png)
    center/1250% no-repeat;
  transition: background-size 0.2s ease;
}
.custom-checkbox input:checked + .checkmark {
  background-size: 60%;
  transition: background-size 0.25s cubic-bezier(0.7, 0, 0.18, 1.24);
}
.custom-checkbox input {
  display: none;
}
.btnhome2 {
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
.btnhome2::before {
  content: "";
  background-color: #e26a6a;
  box-shadow: 10px 10px 0 #f1c40f, 20px 20px 0 #3498db;
  position: absolute;
  left: 0.25rem;
  top: 0.5rem;
  height: 102%;
  width: 102%;
  z-index: -1;
  transition: all 0.4s ease;
}
.btnhome2:hover::before {
  box-shadow: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.tbl-content2 {
  height: 12px;
  overflow-x: auto;
  margin-top: 0px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
#tamcrearpro {
  margin-top: 50px;
  width: 500px;
  max-height: 2000px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background-color: none;
}
#colorbuton {
  color: white;
  background: rgb(8, 161, 8);
}
.imgrespon {
  max-width: 100%;
  height: 200px;
  border-radius: 12px;
}
</style>
