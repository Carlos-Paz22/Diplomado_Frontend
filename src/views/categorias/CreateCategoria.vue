<template>
    
    <div>
        <h1>Crear Nueva categoria</h1>
    <a href="/categoria">Volver</a>

    <form @submit.prevent="guardar">

        <label for="nombre">Nombre</label>
        <input type="text" v-model="nombre" > 
        <button type="submit">Guardar</button>

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