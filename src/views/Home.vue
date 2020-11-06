<template>
    <div>
        Hola puta iniciaste sesion
        <h1>

            {{user.username}}
            {{user.email}}
        </h1>

    </div>
</template>
<script>
export default {
    data(){
        return{
            user:{}
        }
    }
   
    
}
</script>
