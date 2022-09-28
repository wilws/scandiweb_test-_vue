<template>
    <form class="product-add-form" id="product_form">
        <base-input
            :labelName="'SKU'"
            :key="'sku'"
            :type="'text'"
            :name="'Sku'"
            :id="'sku'"
            :placeholder="''"
            :min="0"
        />
        <br>
        <base-input
            :labelName="'Name'"
            :key="'name'"
            :type="'text'"
            :name="'Name'"
            :id="'name'"
            :placeholder="''"
            :min="0"
        />
        <br>
        <base-input
            :labelName="'Price ($)'"
            :key="'price'"
            :type="'number'"
            :name="'Price'"
            :id="'price'"
            :placeholder="''"
            :min="0"
        />

        
        <switchable-form ref="switchableForm"/>
        

    </form>
</template>

<script>
import BaseInput from "../UI/BaseInput.vue";
import SwitchableForm from "../ProductAddComponents/SwitchableForm.vue"
export default {
    components:{BaseInput,SwitchableForm},
    data(){
        return{
            inputIds:['name','sku','price'],
        }
    },
    methods:{
        resetInputValue(){                                                  // Reset value when receive parent's call
            this.inputIds.forEach((id)=>{
                document.getElementById(id).value = null;
            });
            this.$refs.switchableForm.resetAllInputValue(); 
        },
        returnInputValue(){                                                 // Return value when receive parent's call
            let value =[];
            this.inputIds.forEach((id)=>{
                let e = document.getElementById(id);
                value[e.id] = e.value;
            });
            const formValue =  this.$refs.switchableForm.returnInputValue();    // It also calls child "switchable inputs" to return input value
            return {...value, ...formValue}                                     // And combine into one object before return to parent 
        }
    }
}
</script>

<style lang="scss" >

.product-add-form{
    padding:50px 5%;
    width:100%;
    overflow:hidden;

    .switchable-form-section{
        margin-top:4rem;
    }
}


</style>