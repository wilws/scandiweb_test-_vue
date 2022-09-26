<template>
    <header-layout 
        :title="title" 
        :leftBtnName="leftBtnName"
        :rightBtnName="rightBtnName"
        @leftBtnEvent="AddItem"
        @rightBtnEvent="MassDelete"
    ></header-layout>
    <products-frame :products="products"/>
    <!-- <products-frame/> -->
</template>


<script>
import HeaderLayout from "../components/layout/TheHeader.vue";
import ProductsFrame from "../components/ProductListComponents/ProductsFrame.vue";

export default {
    components:{HeaderLayout,ProductsFrame},
    activated() {
        // Since this component is keeping alive.
        // we need to update the dom manually when this component is activate
        this.getProductFromStore();        
    },
    data(){
        return {
            title : "Product List",
            leftBtnName : "ADD",
            rightBtnName : "MASS DELETE",     
            products:[]     
        }
    },
    created(){
        this.getProductFromStore();
    },
    mounted(){

    },
    methods:{
        AddItem(){
            this.$router.push('/add-product');
        },
        MassDelete(){
            this.$store.dispatch('products/removeSeletedItems');
            this.getProductFromStore();
        },
        getProductFromStore(){
            this.products = this.$store.getters['products/getProducts'];
        }
        
    },
    beforeRouteLeave(to,from,next){
        this.$store.dispatch('products/clearRemoveList');    // Remove the selected Items before leave this page
        next();
    },


}
</script>