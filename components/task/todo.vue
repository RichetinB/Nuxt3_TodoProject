<template>
    <div class="task-card" :style="{ transform: `translate(${this.todo_card.posX}px, ${this.todo_card.posY}px)`, backgroundColor: this.card.color  }" 
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @dblclick.native="EmitElement">
      <label for="task-title" @dblclick.stop></label>
      <input @mousedown.stop @dblclick.stop type="text" id="task-title" v-model="this.todo_card.title" placeholder="Entrez le titre" @focus="FocusTitle()" @blur="BlurTitle()" :style="{ backgroundColor: this.card.color }">
    </div>
  </template>
  <script>
export default {
  props: {
    card: reactive(Object)
  },
    data() {
      return {
        todo_card: reactive({...this.card}),
        roomId: this.$route.params.id,
        colorActive: false,
        dragging: false,
      };
    },
    methods: {
      onMouseDown(event) {
      this.dragging = true;
      this.offsetX = event.clientX - this.todo_card.posX;
      this.offsetY = event.clientY - this.todo_card.posY;
    },
    onMouseMove(event) {
      if (this.dragging) {
        this.todo_card.posX = event.clientX - this.offsetX;
        this.todo_card.posY = event.clientY - this.offsetY;
      }
    },
    async onMouseUp() {
      this.dragging = false;
      await this.updatePos()
    },
    FocusTitle() {
      this.textAreaColor = "white"
    },
    async BlurTitle() {
      this.textAreaColor = this.card.color
      await this.updateTitle()
    },
    async updateTitle(){
      const data = {
        id: this.todo_card.id,
        title: this.todo_card.title
      }
      this.$emit('ChangeTitle', data)
    },
    async updatePos(){
      try {
        const card_upd = await $fetch("/api/card/card", {
          method: "PUT",
          body: {
            id: this.todo_card.id,
            posX: this.todo_card.posX,
            posY: this.todo_card.posY
          }
        })
      } catch (error){
        console.log("Erreur lors des changement de la carte :" + error)
      }
    },
    EmitElement(){
      this.$emit('access_popup', this.todo_card.id);
    }
  }
  };
  </script>
  
  <style scoped>
  .task-card {
    background-color: #F5F5F5; /* Gris clair */
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px;
    position: absolute;
    z-index: 999;
  }
  
  label {
    color: #8BC34A; /* Vert citron */
    font-weight: bold;
    margin-top: 5px;
    height: 25px;
    display: block;
  }
  
  input[type="text"], textarea {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border: none;
    border-radius: 3px;
    text-align: center;
  }
  
  div > div {
    margin-top: 5px;
  }
  
  span {
    margin-left: 5px;
  }
  </style>
  
  