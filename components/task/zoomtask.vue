<template>
  <div v-if="isVisible" class="overlay" @click="closePopup()">
      <div id="container" class="container" @click.stop :style="{ backgroundColor: this.popup_card.color }">
        <div class="container-param">
        <ul class="onglet_parameter">
          <li> 
            <button id="btn_parameter" @click="OpenParameter"><img src="https://cdn-icons-png.flaticon.com/512/73/73989.png" alt="parametre"></button>
          </li>
          <li>
            <ul class="parameter" v-if="ParameterIsOpen == true">
              <li>
                <label for="">
                  <input id="color_input" type="color" hidden />
                  <button class="btn_parameter" id="btn_color" @click="openColor()"> Modifier Couleur </button>
                </label>
              </li>
              <li>
                <button class="btn_parameter" id="btn_form">
                  Modifier Forme
                </button>
              </li>
              <li>
                <button class="btn_parameter" id="btn_delete" @click="deleteCard()">
                  Delete Card
                </button>
              </li>
          </ul>
        </li>
        </ul>
      </div>
      <div class="main">
          <div id="header"> 
            <h1> {{ popup_card.title }} </h1> 
          </div>
          <div id="description"> 
            <textarea v-model="this.popup_card.description" @blur="Blur()"> {{ this.popup_card.description }}</textarea>
          </div>
          <div id="checkbox"> je suis les checklist </div>
      </div>
      </div>
    </div>
</template>

<!-- <h1 class="title_popup"> {{ this.card.title }}</h1>w
<button class="close_button" @click="closePopup()">X</button>
<button class="btn_parameter"> <img class="img_parameter" src="https://cdn-icons-png.flaticon.com/512/73/73989.png" alt="Parametre"> </button>
<br>
<button class="color_button" @click=""> Change Color </button>
<br>
<button class="delete_button" @click="deleteCard()"> Delete </button>
<br>
<textarea class="text_description" v-model="this.card.description" cols="50" rows="10" placeholder="Veuillez Fournir une Description a votre Tache" @blur="Blur()"></textarea> -->

<script>
export default {
  props: {
    isVisible: Boolean,
    card: Object
  },
  data() {
    return {
      popup_card: { ...this.card},
      ParameterIsOpen: false
    }
  },
  methods: {
    updateFirst(event) {
      var container = document.getElementById('container')
      console.log("sa marche vite fais")

      if (container) {
        container.style.backgroundColor = event.target.value;
      }
    },
    async updateAll(event) {
      var container = document.getElementById('container')
      container.style.backgroundColor = event.target.value;
      this.popup_card.color = event.target.value;
      await this.updateColor()
    },
    openColor(){
      document.getElementById('color_input').click();
      const colorWell = document.querySelector("#color_input");
      colorWell.addEventListener("input", this.updateFirst, false);
      colorWell.addEventListener("change", this.updateAll, false)
      colorWell.select();
    },
    OpenParameter(){
      if (this.ParameterIsOpen == false){
        this.ParameterIsOpen = true
      }else {
        this.ParameterIsOpen = false
      }
    },
    closePopup(){
      this.$emit("close", this.popup_card)
    },
    async Blur() {
      await this.updateDescription()
      console.log("Update de la carte")
    },
    async updateColor(){
      try {
        const card_update = await $fetch("/api/card/card", {
          method: "PUT",
          body: {
            id: this.popup_card.id,
            color: this.popup_card.color,
          }
        })
        this.$emit('changeColor', card_update)
      } catch (error){
        console.log("Erreur lors des changement de la carte :" + error)
      }
    },
    async deleteCard() {
      try {
        const card_deleted = await $fetch("/api/card/card", {
          method: "DELETE",
          body: {
            id: this.popup_card.id
          } 
        })
        console.log(card_deleted)
        this.$emit("delete_card", card_deleted)
      } catch (error) {
        console.log(" Erreur lors de la supression de la carte" + error)
      }
      this.closePopup()
    },
    async updateDescription(){
      try {
        const card_update = await $fetch("/api/card/card", {
          method: "PUT",
          body: {
            id: this.popup_card.id,
            description: this.popup_card.description,
          }
        })
        this.$emit('changeDescription', card_update)
      } catch (error){
        console.log("Erreur lors des changement de la carte :" + error)
      }
    },
  }
}
</script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
  }

  .overlay {
    position: fixed; /* Positionnement fixe par rapport à la fenêtre de visualisation */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Couleur semi-transparente */
    z-index: 1250;
  }
  .container {
    background-color: aqua;
    position: relative;
    width: 50%;
    min-height: 100%;
    margin: 0 auto;
    border-radius: 10px;
    z-index: 1500; /* Assurez-vous que la popup est au-dessus de l'overlay */
  }

  .main div{
    background-color: teal;
    text-align: center;
    width: 90%;
    margin: 30px auto;
    padding: 10px;
    min-height: 100%;
  }

  #header {
    height: 5vh;
  }

  #description {
    height: 30vh;
  }

  #description textarea {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    resize: none;
    padding: 10px;
  }

  #checkbox {
    height: 48vh;
  }

  .onglet_parameter {
    display: inline-block;
    position: absolute;
  }

  .btn_parameter {
    height: auto;
    width: 150px;
    border-radius: 10px;
    border: 1px solid black;
    padding: 1px;
    background-color: white;
    text-align: center;
    border-radius: 10px;
  }

  .btn_parameter :hover {
    background-color: white;
  }

  #btn_delete {
    background-color: red;
  }

  #btn_form,
  #btn_color {
    background-color: aqua;
  }


  .container-param {
    position: absolute;
    right: 25px;
    top: -25px;
  }


  #btn_parameter {
    width: 50px;
    height: 50px;
    padding: 2px;
    border: 1px solid black;
    border-radius: 150px;
    background-color: white;
  }
</style>