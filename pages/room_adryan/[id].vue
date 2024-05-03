<template>
    <h1> Je suis La page Room numero {{ $route.params.id }}</h1>
    <button @click="addCard"> Add Card </button>
    <todo class="card" v-for="(card, index) in list_card" :key="index" :card="card"/>
</template>

<script>
import todo from '~/components/task/todo.vue';
import zoomtask from '~/components/task/zoomtask.vue';
export default {
    mounted(){
        this.GetCardByRoomId();
    },
        data(){
            return {
                count: 0,
                isPopupVisible: false,
                selectedItemInfo: {},
                list_card: []
            }
        },
        methods: {
            async GetCardByRoomId() {
            try {
                const cards = await $fetch('/api/card/card', {
                    method: 'GET',
                    params: {
                        room: this.$route.params.id
                    }
                })
                console.log("Mes Cartes avec un room id de" + this.$route.params.id + cards)
                this.list_card = cards
            }catch (error){
                console.error('Failed to fetch cards:', error);
            }
            },
            async addCard(){
                const card =  await $fetch('/api/card/card', {
                    method: 'POST',
                    body: {
                    title: "",
                    description:  "",
                    posX: 1,
                    posY: 1,
                    color: "#F5F5F5",
                    roomId: parseInt(this.$route.params.id)
                    },
                })
                this.GetCardByRoomId()
            },
            handleSelected(itemInfo) {
                this.selectedItemInfo = itemInfo;
                this.isPopupVisible = true;
            }
        },
        components: {
            todo,
            zoomtask
        },
    }
</script>

<style>

</style>