<template>

    <router-view v-slot="slotProps"> 
      <keep-alive>          
          <component :is="slotProps.Component"></component>   
      </keep-alive>   
    </router-view>
    <footer-layout/>
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
</style>