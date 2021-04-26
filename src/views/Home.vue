<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Loginszr />
    <Compteur />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import Compteur from "@/components/Compteur.vue";
import Loginszr from "@/components/Loginszr.vue";

export default {
  name: "Home",
  components: {
    //HelloWorld, Compteur,
    Loginszr
  },
};
</script>
