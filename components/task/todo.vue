<template>
    <div class="task-card" :style="{ transform: `translate(${this.x}px, ${this.y}px)`, backgroundColor: color  }" 
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @dblclick.native="EmitElement()">
    <p> la room est : {{ $route.params.id }}</p>
      <label for="task-title">Titre :</label>
      <input type="text" id="task-title" v-model="title" placeholder="Entrez le titre" @focus="FocusTitle()" @blur="BlurTitle()" :style="{ backgroundColor: textAreaColor }">
    </div>
  </template>
  
  <script>
export default {
    data() {
      return {
        roomId: this.$route.params.id,
        x: 0,
        y: 0,
        colorActive: false,
        color: "#F5F5F5",
        dragging: false,
        textAreaColor: "F5F5F5",
        title: 'x',
        description: 'x',
        posX: 1,
        posY: 1,
        color: "#F5F5F5"
      };
    },
    async created() {
    const d = await this.addCard()
    console.log(this.roomId)
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
    onMouseUp() {
      this.dragging = false;
    },
    FocusTitle() {
      this.textAreaColor = "white"
    },
    BlurTitle() {
      this.textAreaColor = "#F5F5F5"
    },
    EmitElement(){
      console.log("You Double Click");
      console.log(this.card_data)
      this.$emit('dblclick', {
        card: this.card_data
      });
    },
    async addCard(){
      return await $fetch('/api/card/card', {
        method: 'POST',
        body: {
          title: this.title,
          description:  this.description,
          posX: this.x,
          posY: this.y,
          color: this.color,
          roomId: parseInt(this.roomId)
        }
      })
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
  
  