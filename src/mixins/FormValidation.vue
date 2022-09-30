<script>
export default {
    data(){
        return{
            stringCheckList: ['name','sku','productType'],
            numberCheckList:['price','height','width','length','weight','size'],
            typeCheckList:['productType']
        }
    },
    methods:{
        validation(key,value){
            const func = this.checkRouting(key);
            return func(key,value);
        },

        checkRouting(key){
            if (this.stringCheckList.includes(key)){
                return this.stringCheck;
            }
            if (this.numberCheckList.includes(key)){
                return this.numberCheck;
            }
            if (this.typeCheckList.includes(key)){
                return this.typeCheck;
            }
        },

        stringCheck(key,value){
            let errMsg  = "";
            const strVal = value.toString().trim();
            if (strVal.length<= 0) {
                errMsg +=`'${key}' cannot be empty.Please, submit required data.<br> `;
            }
            if (strVal.length > 30) {
                errMsg +=`'${key}' cannot excess 30 characters.<br> `;
            }
            if (!errMsg){
                return;
            } else {
                return errMsg;
            }
        },

        numberCheck(key,value){
            let errMsg  = "";
            if (isNaN(value)) {
                errMsg +=`'${key}' must be a number.<br> `;
            }
            if (value.toString().trim().length <= 0) {
                errMsg +=`'${key}' cannot be empty.Please, submit required data.<br> `;
            }
            if ( +value < 0) {
                errMsg +=`'${key}' cannot be negative.<br> `;
            }
            if (!errMsg){
                return;
            } else {
                return errMsg;
            }
        },
    

        typeCheck(key,value){
            let errMsg = "";
            const allowedType = ['Book','Furniture','DVD'];
            if (!allowedType.includes(value)){
                errMsg = `'${key}' is not allowed type. Please, provide the data of indicated type<br> `
                return errMsg;
            } else {
                return;
            }
        }
    }
}
</script>