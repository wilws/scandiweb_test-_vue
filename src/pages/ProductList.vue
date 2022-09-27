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
        this.getProductFromStore();        
    },
    data(){
        return {
            title : "Product_List",
            leftBtnName : "ADD",
            rightBtnName : "MASS DELETE",     
            products:[]     
        }
    },
    async created(){
        await this.$store.dispatch('products/fetchProductFromDatabase');
        await this.getProductFromStore();
    },
    mounted(){

    },
    methods:{
        AddItem(){
            this.$router.push('/add-product');
        },
        async MassDelete(){
            // this.$store.dispatch('products/removeSeletedItems');
            await this.$store.dispatch('products/deleteItemsFromDatabase');
            await this.getProductFromStore();
        },
        getProductFromStore(){
            this.products = this.$store.getters['products/getProducts'];
        }
        
    },
    beforeRouteLeave(to,from,next){
        this.$store.dispatch('products/clearRemoveList');    // Remove the selected Items before leave this page
        this.title=""
        next();
    },


}
</script>

<style lang="scss" scoped>
    .product-list-section{
        overflow: hidden;
        @include pageSetting();
    }
</style>