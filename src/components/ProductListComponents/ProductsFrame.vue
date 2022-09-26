<template>
    <div v-for="product in products" :key="product.id">
        <product-card
            :id ="product.id"
            :sku="product.sku"
            :name="product.name"
            :price="product.price"
            :spec="product.spec"
            :type="product.productType"
            :param="product.id"
            :key="product.id"

            ref="card"
        >
        </product-card>
    </div>
</template>


<script>
import ProductCard from "./ProductCard.vue";

export default {
    props:['products'],
    components:{ProductCard},  
}
</script>


<style lang="scss">

</style>