<template>
  <div v-if="isVisible" class="core">
    <div class="core-content">
      <span @click="closePopup()">X</span>
      <h3>{{ todo_info.title }}</h3>
      <!-- Add info -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    todo_info: Object
  },
  methods: {
    closePopup(){
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
  .core {
    background-color: aqua;
    position: absolute, fixed;
    width: 50%;
    height: 100%;
    text-align: center;
    margin-left: 25%;
    margin-right: 25%;
  }
</style>