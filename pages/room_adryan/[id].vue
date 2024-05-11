<template>
    <h1> Je suis La page Room numero {{ $route.params.id }}</h1>
    <h2 v-if="rooms.length === 0">Aucune chambre trouvée.</h2>
      <h2 v-else >{{ rooms.name }}</h2>
    <button @click="addCard"> Add Card </button>
    <todo class="card" v-for="(card) in this.list_card" :key="card.id" :card="card" @access_popup="handleSelected"/>
    <zoomtask v-if="isPopupVisible == true" @close="closePopup()" :isVisible="isPopupVisible" :card="this.selectedItemInfo" @delete_card="deleteCard" @changeDescription="changeDescription" @changeColor="changeColor"></zoomtask>
</template> 


<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const roomId = route.params.id;
const rooms = ref([]);
  
  onMounted(async () => {
  try {
    rooms.value = await getRoom(roomId);

    console.log("rooms.value", rooms.value.name)
  } catch (error) {
    console.error('Error fetching room:', error);
  }
});
  

  
  async function getRoom(id) {
     return await $fetch(`/api/rooms/${id}`);
    
  }
</script>

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
                selectedItemInfo: reactive({}),
                list_card: reactive([])
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
                this.list_card = cards
                console.log(this.list_card)
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
                    color: "#f1f2f4",
                    roomId: parseInt(this.$route.params.id)
                    },
                })
                await this.GetCardByRoomId()
            },
            handleSelected(data) {
                console.log(data)
                this.list_card.forEach((obj) => {
                    if (obj.id == data){
                        const index = this.list_card.indexOf(obj)
                        const info = this.list_card[index]
                        console.log(info)
                        this.selectedItemInfo = info;
                    }
                })
                this.openPopup()
            },
            async closePopup() {
                this.isPopupVisible = false;
                console.log("Close Pop up" + this.isPopupVisible)
                this.GetCardByRoomId()
            },
            openPopup() {
                this.isPopupVisible = true;
                console.log("Open Pop up" + this.isPopupVisible)
            },
            deleteCard(data) {
                console.log(data.id)
                this.list_card.forEach((obj) => {
                    if (obj.id == data.id){
                        const index = this.list_card.indexOf(obj)
                        const debug = this.list_card.splice(index, 1)
                        console.log(debug)
                        console.log(this.list_card)
                    }
                })
            },
            changeDescription(data){
                this.list_card.forEach((obj) => {
                    if (obj.id == data.id){
                        const index = this.list_card.indexOf(obj)
                        this.list_card[index].description = data.description
                    }
                })
                console.log(this.list_card)
            },
            changeColor(data) {
                this.list_card.forEach((obj) => {
                    if (obj.id == data.id){
                        const index = this.list_card.indexOf(obj)
                        this.list_card[index].color = data.color
                    }
                })
                console.log(this.list_card)
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