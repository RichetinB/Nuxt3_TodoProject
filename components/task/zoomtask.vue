<template>
  <div v-if="isVisible" class="modal">
    <div class="core-content">
      <span @click="closePopup()">X</span>
      <h3>{{ card.title }}</h3>
      <!-- Add info -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    card: Object
  },
  methods: {
    closePopup(){
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
  .modal {
    background-color: aqua;
    position: absolute, fixed;
    width: 50%;
    height: 100%;
    text-align: center;
    margin-left: 25%;
    margin-right: 25%;
  }
</style>