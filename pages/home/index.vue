<template>
    <div>
        <h1>
            Je suis la Page Home
        </h1>
        <div class="container">
            <tr v-for="(room, index) in list_room" :key="index">
                <NuxtLink to="/room/2">
                    <room :room="room" />
                </NuxtLink>
            </tr>
        </div>
    </div>
</template>

<script>
import room from '~/components/room.vue';
    export default {
        data() {
    return {
      list_room: [room, room, room, room, room, room]
    };
  },
//   mounted() {
//     this.list_room.forEach((room, index) => {
//       this.maFonction(room, index);
//     });
//   },
//   methods: {
//     maFonction(room, index) {
//       console.log(`Traitement pour ${room} à l'index ${index}`);
//     }
//   }
    }
</script>

<style scoped>

.card {
    position: absolute;
}

.container {
    display: flex; /* Utiliser une grille flexbox pour les éléments enfants */
    flex-wrap: wrap;
}
</style>
