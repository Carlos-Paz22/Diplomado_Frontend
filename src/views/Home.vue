<template >
<div>
    <div class="row mx-0 py-5 justify-content-around">
      <div class="col-4">
        <h2>Empresas</h2>
      </div>
      <div class="col-2"></div>
    </div>
<<<<<<< HEAD
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<div class="  row justify-content-center align-items-center mx-0 ">
 <!--  <h3>Banco de empresas</h3> -->
  <div class="col-11 col-sm-7 col-md-5 col-lg-4 " v-for = "imagen in imagenes" :key="imagen.id" >
      <a :href="`/publicproduct/${imagen.slug}.com`">
    <div class="card">
=======
<div class="row justify-content-around align-items-center mx-0 ">
  
  <div class="col-10 col-sm-6 col-md-4 col-lg-3" v-for = "imagen in imagenes" :key="imagen.id">
    <div class="card" >
>>>>>>> f5df422f418adc30c825c0895b041367b061708c
      <div class="imgBx">
         <img :src="'http://localhost:1337'+imagen.logo.url">
      </div>
      <div class="details">
<<<<<<< HEAD
       <h5 class="card-title">{{ imagen.social}}</h5>
       <h5 class="card-title">Contacto: {{ imagen.email}}</h5>

      </div>
  </div>
  </a>
</div>
=======
       <h5 class="card-title">{{imagen.social}}</h5>
      </div>
  </div>

  </div>
>>>>>>> f5df422f418adc30c825c0895b041367b061708c
</div>
</div>
  
</template>
<script>
import axios from "axios";
import debounce from "debounce";

export default {
  name: "Home",
  data() {
    return {
      
      user: {},
      imagenes: null,
      slide: 0,
      sliding: null,
       props: ["items"],
      tags: [],
      checkedNames: "",
      buscar: "",
      url:"",
       alerta: false,
       search: "",
    salir:"",
    user:"",
    };
  },
  mounted() {
    this.user =JSON.parse(localStorage.getItem('user'));
    this.traerimagen();
    
  },
  methods:{
    traerimagen() {
      axios
        .get("http://localhost:1337/empresas?_sort=id%3ADESC", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.imagenes = response.data;
          console.log(this.imagenes);
        });
    },
    
  }
  
};
</script>




<style >
 .format-null{all: unset !important;}
  .div-search{border:1px solid;border-radius:10px;border-color: #c4c2c2;height: 2.5rem !important;}
  .input-search{ height: 100% !important;margin-left: 2rem !important;}
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .collap1{color: #eeeeee !important; padding-top: 10px !important;font-size: 14px;}
  .collap1:hover{color: black !important;}
.box {
 
  width: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 15px;
  margin-top: 100px;
 
}
.card {
  position: relative;
  width: 250px !important;
  height: 300px !important;
  background: #fff;
  
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.card:before,
.card:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #007bff !important;
  transition: 0.5s;
  z-index: -1;
}
.card:hover:before {
  transform: rotate(20deg);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}
.card:hover:after {
  transform: rotate(10deg);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}
.card .imgBx {
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  background: #222;
  transition: 0.5s;
  z-index: 1;
}

.card:hover .imgBx {
  bottom: 80px;
}

.card .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card .details {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  height: 60px;
  text-align: center;
}

.card .details h2 {
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 20px;
  color: #777;
  text-transform: uppercase;
}

.card .details h2 span {
  font-weight: 500;
  font-size: 16px;
  color: #f38695;
  display: block;
  margin-top: 5px;
}
</style>