<template>
     <!-- <div :id="id"> -->
        <div class="product-card" :class="{ clicked: selected }">
            <input class="delete-clickbox"  type="checkbox" :name="name"  @click="selectCard(id)"   >
            <div class="card-content">
                <p>{{ sku }}</p>
                <p>{{ name }}</p>
                <p>{{ price }}  $</p>
                <!-- <p> {{ type }} </p> -->
                <p> {{ description }} : {{ spec }} {{ unit }} </p>
            </div>
        </div>
     <!-- </div> -->
</template>

<script>
export default {
    props:["id","sku","name","price","type","spec"],
    activated(){
        this.uncheck();
    },
    created(){
        this.setUnit(this.type);
    },
    data(){
        return {
            description : "",
            unit : "",
            elementId : "",
            selected : false
        }
    },
    methods:{
        setUnit(type){
            const u = this.getSpecUnit(type);
            this.description = u[0];
            this.unit = u[1];
        },
        uncheck(){
            document.querySelectorAll(".delete-clickbox").forEach((c)=>{
                c.checked = false;
            });
            this.selected = false;
        },
        selectCard(id){
            if (!this.selected) {                
                this.$store.dispatch({
                    type: "products/addItemsToRemoveList",
                    item: id,	
                });
                this.selected = true;
                
            } else {
                this.$store.dispatch({
                    type: "products/removeItemsFromRemoveList",
                    item: id,	
                });
                this.selected = false;
            }

            console.log(this.$store.getters['products/getRemoveList'])
        }
    },


     
}
</script>

<style lang="scss">

.product-card{
    border:rgb(27, 27, 27) 3px solid;
    position: relative;
    width:200px;
    height:150px;
    padding:.7rem;
    box-shadow: .1rem .1rem .5rem rgba(37, 37, 37, 0.527);
    transition-property: transform, border,box-shadow;
    transition: all .3s ease;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    /* transition: transform .4s; */

    &:hover{
        box-shadow: .3rem .3rem 1rem rgba(11, 137, 187, 0.527);
        border:rgba(247, 249, 250, 0.527) thin solid;
        transform: scale(1.01);
        animation: shine 3s 0s infinite;
    }

    @keyframes shine {
        0%{ box-shadow: .3rem .3rem 1rem rgba(11, 137, 187, 0.527);}
        25%{ box-shadow: .4rem .4rem 2rem rgba(11, 137, 187, 0.8);}
        50%{ box-shadow: .3rem .3rem 1rem rgba(11, 137, 187, 0.527)}
        75%{ box-shadow: .4rem .4rem 2rem rgba(11, 137, 187, 0.8);}
        100%{ box-shadow:.3rem .3rem 1rem rgba(11, 137, 187, 0.527)}
    }

    &.clicked{
        border:rgb(241, 10, 10) 3px solid;
         background-color: rgb(255, 196, 196);
    }

     &.clicked:hover{
        animation: unset;
        box-shadow: .3rem .3rem 1rem rgba(252, 97, 97, 0.527);
       
    }


    .card-content{
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
        font-family:  $primary-font;
        font-weight: bold;
    }
}
</style>