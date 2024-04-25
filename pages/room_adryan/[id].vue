<template>
    <h1> Je suis La page Room numero {{ $route.params.id }}<div></div></h1>
    <button @click="AddCard"> Add Card </button>
    <div class="card" v-for="(card, index) in list_card" :key="index">
      <TaskTodo :card="card" />
      <div>
    <todo
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      @selected="handleSelected"
    />
    <zoomtask
      :isVisible="isPopupVisible"
      :info="selectedItemInfo"
      @close="isPopupVisible = false"
    />
  </div>
    </div>
</template>

<script>
import todo from '~/components/task/todo.vue';
import zoomtask from '~/components/task/zoomtask.vue';
    export default {
        components: {
            todo,
            zoomtask
        },
        data(){
            return {
                list_card: [],
                isPopupVisible: false,
                selectedItemInfo: {}
            }
        },
        methods: {
            AddCard() {
                this.list_card.push("")
            },
            handleSelected(itemInfo) {
                this.selectedItemInfo = itemInfo;
                this.isPopupVisible = true;
            }
        },
    }
</script>

<style scoped>

.card {
    position: flex;
    width: 1px;
    height: 1px;
}

</style>
