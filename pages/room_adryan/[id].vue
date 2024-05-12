<template>
    <header class="bg-blue-500 text-white py-4 px-6 text-center w-full">
        <h1 class="text-xl font-semibold font-righteous-regular">TodoPierro</h1>
      </header>
        <div id="header_page">
            <h2 v-if="rooms.length === 0">Aucune chambre trouvée.</h2>
            <h2 v-else id="titre_page">{{ rooms.name }}</h2>
        </div>  
        <button @click="addCard"> Add Card </button>
        <todo class="card" v-for="(card) in this.list_card" @ChangeTitle="ChangeTitle" :key="card.id" :card="card" @access_popup="handleSelected"/>
        <zoomtask v-if="isPopupVisible == true" @close="closePopup()" :isVisible="isPopupVisible" :card="this.selectedItemInfo"  @delete_card="deleteCard" @changeDescription="changeDescription" @changeColor="changeColor"></zoomtask>
</template> 


<script setup>

import axios from 'axios';
import { useRoute } from 'vue-router';
const route = useRoute();
const roomId = route.params.id;
const rooms = ref([]);

const { initAuth } = useAuth()

onBeforeMount(() => {
  initAuth()
})

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
import axios from 'axios';

const { putUser, useAuthUser } = useAuth(); 
const user = useAuthUser();

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
        // middleware: [ 'is-access' ],
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
            },
            async ChangeTitle(data){
                this.list_card.forEach((obj) => {
                    if (obj.id == data.id){
                        const index = this.list_card.indexOf(obj)
                        this.list_card[index].title = data.title
                    }
                })
                try {
                    const card_upd = await $fetch("/api/card/card", {
                    method: "PUT",
                    body: {
                        id: data.id,
                        title: data.title,
                    }
                    })
                } catch (error){
                    console.log("Erreur lors des changement de la carte :" + error)
                }
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
body {
    height: 100vh;
    width: 100%;
    background-image: url(/static/background.jpg);
    background-repeat: none;
    background-size: cover;
    background-repeat: repeat;
}

header {
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

#header_page {
    width: 300px;
    display: flex;
    background-color: rgb(115, 115, 115);
    color: white;
    border-radius: 0px 0px 20px 0px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5); 
}

#titre_page {
    font-weight: bold;
    font-size: 1.6rem;
    width: auto;
    margin: auto 20px;
}

button {
    border: solid black 1px;
    padding: 10px;
    background-color: rgb(99, 209, 99);
}


</style>