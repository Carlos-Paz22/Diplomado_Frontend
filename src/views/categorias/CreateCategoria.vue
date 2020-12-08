<template>
    
    <div class=" container  ">
        <h1>Crear Nueva categoria</h1>
    <!-- <a href="/categoria">Volver</a> -->

    <form class="main" @submit.prevent="guardar">

        <label class="mr-2" for="nombre">Nombre</label>
        <input  class="mr-2" type="text" v-model="nombre" > 
 <b-button type="submit"  variant="success">Guardar</b-button>
       
       

    </form>

    </div>
    

</template>


<script>

import axios from 'axios'


export default {
    name : 'CreateCategoria',
    data(){
        return{
            nombre: '',
        };
    },

    methods:{
        
        guardar() {
            const tokenverificacion = localStorage.getItem('token')
            axios.post("http://localhost:1337/categorias",{
                nombre: this.nombre,
            },
            {
              headers: {
            'Authorization': 'Bearer ' + tokenverificacion
         
         },

            })
            
            .then((response) => {
                this.$router.push('/categoria')
            })
        }
    }

   
}
</script>

<style >

.main{
    margin-top: 50px;
}


</style>