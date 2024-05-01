<template>
    <h1> Je suis La page Room numero {{ $route.params.id }}</h1>
    <button @click="AddCard"> Add Card </button>
    <todo class="card" v-for="(i, index) in list_card" :key="index" :card="i"/>
</template>

<script>
import todo from '~/components/task/todo.vue';
import zoomtask from '~/components/task/zoomtask.vue';
    export default {
        data(){
            return {
                count: 0,
                isPopupVisible: false,
                selectedItemInfo: {},
                list_card: [],
            }
        },
        components: {
            todo,
            zoomtask
        },
        methods: {
            async asyncData({ params }) {
            const roomId = $route.params.id; // Obtenez l'ID à partir des paramètres de route
            return { roomId };
            },
            async AddCard() {
                this.list_card.push({id: this.count, title:""})
                this.count +=1
                console.log(this.list_card)
            },
            handleSelected(itemInfo) {
                this.selectedItemInfo = itemInfo;
                this.isPopupVisible = true;
            }
        },
    }
</script>

<style>

</style>