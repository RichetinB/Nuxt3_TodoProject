<template>
    <div class="main_room">
        <h1> Je suis une Room </h1>
    </div>
</template>

<script>
export default {
    props: {
        title: Object
    }
}
</script>

<style scoped>

.main_room {
    background-color: #8BC34A;
    height: 150px;
    width: 300px;
    margin: 20px;
    border-radius: 20px;
}

</style>