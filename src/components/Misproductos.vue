
<template>
  <div>
    <div class="box">
      <div class="card">
        <div class="imgBx">
          <img
            :src="'http://localhost:1337' + items.imagen.url"
            class="img-fluid"
          />
        </div>
        <div class="details">
          
            <h5 class="card-title">{{ items.nombre }}</h5>
             <h5 class="card-title"> $ {{ items.precio }}</h5>
             
          </div>
      </div>

     

      <div class="  col-10 descripcion">
        <p>
         
          {{ items.descripcion }} <br />
         
          Celular: {{ items.celular1 }}
        </p>
      </div> 
    </div>
  </div>
</template>
 


<script>
import axios from "axios";

export default {
  name: "Galeria",
  props: ["items"],

  methods: {},
};
</script>

<style>
.box {
  width: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 15px;
  margin-top: 100px;
}
.card {
  position: relative;
  width: 300px;
  height: 350px;
  background: #fff;
  margin-top: 50px;
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
  background: rgb(52, 252, 185);
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

.descripcion {
  font-family: Lato, sans-serif;
}
</style>
