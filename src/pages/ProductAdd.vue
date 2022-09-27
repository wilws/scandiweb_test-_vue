<template>
    <div class="product-add-section">
        <alert-component v-show="showAlert"
            :msg="errorMsg"
            :btnContent="'OK'"
            @confirm="closeAlert"
        ></alert-component>
        <header-layout 
            :title="title" 
            :leftBtnName="leftBtnName"
            :rightBtnName="rightBtnName"
            @leftBtnEvent="saveItem"
            @rightBtnEvent="cancel"
        ></header-layout>
        <products-add-frame ref="productAddFrame" /> 
    </div>
</template>


<script>

import HeaderLayout from "../components/layout/TheHeader.vue";
import ProductsAddFrame from "../components/ProductAddComponents/ProductsAddFrame.vue"
import FormValidation from "../mixins/FormValidation.vue";
import AlertComponent from "../components/UI/AlertComponent.vue"

export default {
    components:{HeaderLayout,ProductsAddFrame,AlertComponent},
    mixins:[FormValidation],
    data(){
        return {
            title : "Product_Add",
            leftBtnName : "Save",
            rightBtnName : "Cancel",
            inputIds:['sku','name','price','size','productType','height','width','length','weight'],
            showAlert:false,
            errorMsg: "",
        }
    },

    mounted(){

    },

    methods:{

        async saveItem(){

            const re = this.getInputValues();
            
            if (re.status !== 'success'){
                this.showAlert = true;
                this.errorMsg = re.message;

            } else {
                const result = await this.$store.dispatch({
                    type:"products/createItem",
                    data:re.data
                });
                if (result.status === 'success'){
                    this.$router.push('/');
                } else {
                    this.showAlert = true;
                    this.errorMsg = re.message;
                }
            }
        },
        closeAlert(){
            console.log('trigger')
            this.showAlert = false;
            this.errorMsg = "";
        },

        cancel(){
            this.$router.push('/');
        },
 
        getInputValues(){

            const inputValue = this.$refs.productAddFrame.returnInputValue();
            let values = {};
            let result =[];
            let errMsg = "";
       
            for (const [key, value] of Object.entries(inputValue)) { 
                let v = this.validation(key,value) // validating data, return errMsg (String) if not valid
                if (v){
                    errMsg += v;          
                } else {
                    values[key] = value;            // if valid, go on looping 
                }
            }
           

            // After looping complete / stop, check is there any errMsg
            if (!errMsg) {           // if no err, construct the data "spec"
                if (values.height){
                    values['spec'] =`${values.height}x${values.width}x${values.length}`;   
                } else {
                     values['spec'] = (!values.weight) ? values.size : values.weight;
                }
                result = {
                    status:'success',
                    data: values
                }
            } else {            // if err, return status 
                result = {
                    status:'error',
                    message: errMsg
                }
            }
            return result;
        },

        resetForm(){
            this.$refs.productAddFrame.resetInputValue();
        }
    },

    beforeRouteLeave(to,from,next){
        // reset the form before leave this page
        this.resetForm();
        this.title=""
        next();
    }
}
</script>

<style lang="scss">
.product-add-section{
    @include pageSetting();
}
</style>