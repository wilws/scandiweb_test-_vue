<template>
    <div class="product-list-section">
        <header-layout 
            :title="title" 
            :leftBtnName="leftBtnName"
            :rightBtnName="rightBtnName"
            @leftBtnEvent="AddItem"
            @rightBtnEvent="MassDelete"
        ></header-layout>
        <products-frame :products="products"/>
    </div>
</template>


<script>
import HeaderLayout from "../components/layout/TheHeader.vue";
import ProductsFrame from "../components/ProductListComponents/ProductsFrame.vue";

export default {

    components:{HeaderLayout,ProductsFrame},
    activated() {
        // Since this component is keeping-alive. (i.e. No killing during route-out)
        // Therefore, we need to update the DOM manually here when this component is activate
        this.getProductFromStore();            // Fetch product from VUEX store whenever entering in this page
    },
    data(){
        return {
            title : "Product_List",             // Set header title
            leftBtnName : "ADD",                // Set header left button's name
            rightBtnName : "MASS DELETE",       // Set header right button's name
            products:[]                         // to store the products fetched from VUEX store
        }
    },
    async created(){
        // Actions in here only perform at the first entery  or refresh of the page.
        // Since the page is not killed when routing, any function required to be performed should be put in activated()
        await this.$store.dispatch('products/fetchProductFromDatabase');   // When the app is created, fetch data from database.
        await this.getProductFromStore();                                  // Then fetch product from VUEX store 
    },
    methods:{
        AddItem(){
            this.$router.push('/add-product');          // Route to "/add-product"  page         
        },
        async MassDelete(){
            await this.$store.dispatch('products/deleteItemsFromDatabase');   // Delete items in removeList      
            await this.getProductFromStore();                                  // Then update the products list 
        },
        getProductFromStore(){
            this.products = this.$store.getters['products/getProducts'];      // Fetch product from vuex store.
        }
        
    },
    beforeRouteLeave(to,from,next){
        this.$store.dispatch('products/clearRemoveList');    // Remove the selected items before leave this page
        this.title=""                                        // Reset title
        next();
    },


}
</script>

<style lang="scss" scoped>
    .product-list-section{
        overflow: hidden;
        @include pageSetting();              // Import the pre-defined page setting in assets/styles/_variables.scss.
                                             // The scss file is globalised by setting in vue.config.js
    }
</style>