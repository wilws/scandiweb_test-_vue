<template>
    <h1>{{title}}</h1>
    <button @click="leftBtnFunc">{{leftBtnName}}</button>
    <button @click="rightBtnFunc">{{rightBtnName}}</button>
    <hr>
</template>

<script>
export default {
    props:["title", "leftBtnName", "rightBtnName"],
    emits: ['leftBtnEvent','rightBtnEvent'],
    methods:{
        leftBtnFunc(){
            this.$emit('leftBtnEvent');
        },
        rightBtnFunc(){
            this.$emit('rightBtnEvent');
        }
    }
}
</script>