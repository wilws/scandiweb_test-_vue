<template>
    <div class="container">
      <router-view v-slot="slotProps"> 
        <keep-alive>    
              <component :is="slotProps.Component"></component>   
        </keep-alive>   
      </router-view>
      <footer-layout/>
    </div>
</template>

<script>
import FooterLayout from "./components/layout/TheFooter.vue";
export default {
  components:{
    FooterLayout
  },
  created(){
    const LIVE_MODE = false;
    this.$store.dispatch('setServerUrl',LIVE_MODE);
    
  }

}
</script>


<style lang="scss">

/* Common Style */

* {
    margin:0;
    padding:0;
    outline:none;
    box-sizing:border-box;
    text-decoration:none;
}

.container{
  position: relative;
  width:100vw;
  height:100vh;
  min-width: 220px;
  /* min-height: 100vh; */
  border:rgb(0, 0, 0) solid thick;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0 2.5rem;
  
}
</style>