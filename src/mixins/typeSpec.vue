
<script>
export default {

    methods:{
        getSpecUnit(type){
            const unit = {
                DVD:["Size","MB"],
                Book:["Weight","KG"],
                Furniture:["Dimension",""]
            }
            return unit[type];
        }
    }
}
</script>
