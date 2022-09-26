<template>
<form>
    <base-input
        :labelName="'SKU'"
        :key="'sku'"
        :type="'text'"
        :name="'Sku'"
        :id="'sku'"
        :placeholder="'please enter product sku'"
    />
    <br>
    <base-input
        :labelName="'Name'"
        :key="'name'"
        :type="'text'"
        :name="'Name'"
        :id="'name'"
        :placeholder="'please enter product name'"
    />
    <br>
    <base-input
        :labelName="'Price ($)'"
        :key="'price'"
        :type="'number'"
        :name="'Price'"
        :id="'price'"
        :placeholder="'please enter product price'"
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
        resetInputValue(){
            this.inputIds.forEach((id)=>{
                document.getElementById(id).value = null;
            });
            this.$refs.switchableForm.resetAllInputValue(); 
        },
        returnInputValue(){
            let value =[];
            this.inputIds.forEach((id)=>{
                let e = document.getElementById(id);
                value[e.id] = e.value;
            });

            const formValue =  this.$refs.switchableForm.returnInputValue();
            return {...value, ...formValue}
        }
    }
}
</script>