<template>
     <!-- <div :id="id"> -->
        <div class="product-card" :class="{ clicked: selected }">
            <input class="delete-checkbox"  type="checkbox" :name="name"  @click="selectCard(id)"   >
            <div class="card-content">
                <p>{{ sku }}</p>
                <p>{{ name }}</p>
                <p>{{ price }}  $</p>
                <p> {{ attribute }} : {{ spec }} {{ unit }} </p>
            </div>
        </div>
     <!-- </div> -->
</template>

<script>
export default {
    props:["id","sku","name","price","type","spec"],
    activated(){     
                                   
        this.uncheck();                        //  Unset all the checkbox
    },
    created(){
        this.setUnit(this.type);               //  Set the product type's attribute
    },
    data(){
        return {
            attribute : "",                    //  Store attribute like : "Weight" / "Size" / Height, etc
            unit : "",                         //  Store unite like: "KG" / "CM" / Height, etc                  
            selected : false                   //  State check if the box is checked.
        }
    },
    methods:{
        setUnit(type){                            // Set the type's attribute                             
            const u = this.getSpecUnit(type);     // in "mixins/typeSepc.vue", there is a object To match product type with: 
            this.attribute = u[0];                // "attribute" (Obj[0]) ||  "unit" (Obj[1])  
            this.unit = u[1];
        },


        uncheck(){
            document.querySelectorAll(".delete-checkbox").forEach((c)=>{      // Reset the checkbox to un click.
                c.checked = false;                                            // Used whenever entering to this pag 
            });
            this.selected = false;
        },


        selectCard(id){                                           // When the box is checked                           
            if (!this.selected) {                                 // Check if it is checked 
                this.$store.dispatch({                            // if not, this is a add to the remove list click
                    type: "products/addItemsToRemoveList",        //  trigger actions to update the removeList in VUEX
                    item: id,	
                });
                this.selected = true;                              // Alter state to true =  "this box is in the remove list"
                
            } else {                                               // Vice versa below
                this.$store.dispatch({
                    type: "products/removeItemsFromRemoveList",
                    item: id,	
                });
                this.selected = false;
            }
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
    overflow:hidden;
    cursor: pointer;


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
        /* position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0; */
        text-align: center;
        font-family:  $primary-font;
        font-weight: bold;
    }
}
</style>