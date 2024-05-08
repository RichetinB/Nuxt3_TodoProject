// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue'
import RoomDetail from '../pages/room/RoomDetail.vue';

const routes = [
  // Autres routes...
  {
    path: '/room/:id',
    name: 'RoomDetail', // Assurez-vous que le nom de la route correspond exactement à celui utilisé dans <router-link>
    component: RoomDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
