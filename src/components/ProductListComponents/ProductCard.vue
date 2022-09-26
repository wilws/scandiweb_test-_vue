<template>
     <div :id="id">
        <input class="delete-clickbox"  type="checkbox" :name="name"  @click="selectCard(id)" >
        <div>
            <p>{{ sku }}</p>
            <p>{{ name }}</p>
            <p>{{ price }}</p>
            <p> {{ type }} </p>
            <p>
                {{ description }} 
                {{ spec }} 
                {{ unit }} 
            </p>
        </div>
     </div>
</template>

<script>
export default {
    props:["id","sku","name","price","type","spec"],
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