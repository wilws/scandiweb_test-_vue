<template>
    <label :for="id">{{ labelName }}</label>
    <input 
        :key="id"
        :type="type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="value"
    />
</template>

<script>
export default {
    props:['id','labelName','type','name','placeholder','value']
}
</script>