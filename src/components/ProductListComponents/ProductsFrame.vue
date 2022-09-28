<template>
    <div class="products-frame">
        <div class="cards-wrapper">
            <product-card v-for="product in products" :key="product.id"
                :id ="product.id"
                :sku="product.sku"
                :name="product.name"
                :price="product.price"
                :spec="product.spec"
                :type="product.productType"
                :param="product.id"
                ref="card"
            >
            </product-card>
        </div>
    </div>
</template>


<script>
import ProductCard from "./ProductCard.vue";

export default {
    props:['products'],
    components:{ProductCard},
    mounted(){
        window.addEventListener("resize",this.centralise);       // when this component is mounted, create a listenen that always adjuct the cards positions
        this.centralise();                                                                 
    },
    methods:{
        centralise(){                                                                       // keep the items in center
            const boxWidth = 200;
            const gap = 35;
            const totalBoxWidth = boxWidth+gap;
            const frameWidth = document.querySelector('.products-frame').offsetWidth;
            const quotient = Math.trunc((frameWidth-boxWidth)/totalBoxWidth);
            const rowWidth = quotient*totalBoxWidth + boxWidth;
            const leftPadding = (frameWidth - rowWidth)/2
            document.querySelector('.cards-wrapper').style.paddingLeft = `${leftPadding}px`;
        }
    }  
}
</script>


<style lang="scss">
    .products-frame{
        padding:20px 0;
        width:90%;
        /* border:red thin solid; */
        overflow:scroll;


        .cards-wrapper{
            width:100%;
            display: flex;
            flex-wrap: wrap;
            /* border:red thin solid; */
            /* padding-left:20px; */
            /* justify-content: left; */
            gap:35px;
        

             /* @media(max-width:895px){
                padding-left:20px;
            } */
            /* @media(max-width:460px){
                flex-direction: column;
                align-items: center;
                justify-content: center;
            } */
        }
}
</style>