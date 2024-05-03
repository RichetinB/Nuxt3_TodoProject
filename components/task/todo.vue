<template>
    <div class="task-card" :style="{ transform: `translate(${this.x}px, ${this.y}px)`, backgroundColor: this.color  }" 
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @dblclick.native="EmitElement()">
    <p> la room est : {{ $route.params.id }} est mon id est : {{ card.id }}</p>
      <label for="task-title">Titre :</label>
      <input type="text" id="task-title" v-model="this.title" placeholder="Entrez le titre" @focus="FocusTitle()" @blur="BlurTitle()" :style="{ backgroundColor: textAreaColor }">
    </div>
  </template>
  
  <script>
export default {
  props: {
    card: Object
  },
    data() {
      return {
        roomId: this.$route.params.id,
        x: this.card.posX,
        y: this.card.posY,
        title: this.card.title,
        colorActive: false,
        color: this.card.color,
        dragging: false,
        textAreaColor: "F5F5F5",
      };
    },
    methods: {
      onMouseDown(event) {
      this.dragging = true;
      this.offsetX = event.clientX - this.x;
      this.offsetY = event.clientY - this.y;
    },
    onMouseMove(event) {
      if (this.dragging) {
        this.x = event.clientX - this.offsetX;
        this.y = event.clientY - this.offsetY;
      }
    },
    async onMouseUp() {
      this.dragging = false;
      await this.updateCard()
    },
    FocusTitle() {
      this.textAreaColor = "white"
    },
    async BlurTitle() {
      this.textAreaColor = this.color
      await this.updateCard()
    },
    async updateCard(){
      try {
        const card_update = await $fetch("/api/card/card", {
          method: "PUT",
          body: {
            id: this.card.id,
            title: this.title,
            description: this.card.description,
            posX: this.x,
            posY: this.y,
            color: this.color,
          }
        })
      } catch (error){
        console.log("Erreur lors des changement de la carte :" + error)
      }
    },
    EmitElement(){
      console.log("You Double Click");
      console.log(this.card_data)
      this.$emit('dblclick', {
        card: this.card_data
      });
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
  }
  
  label {
    color: #8BC34A; /* Vert citron */
    font-weight: bold;
    margin-top: 5px;
    display: block;
  }
  
  input[type="text"], textarea {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid #F5F5F5;
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
  
  