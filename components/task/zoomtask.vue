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
          <div id="checkbox">
            <button @click="AddChecklist"> Add Checklist </button>
            <checklist class="list-checkbox" v-for="(check) in this.list_checklist" :checklist="check" @ChangeTitleChecklist="ChangeTitleChecklist" @DeleteChecklist="DeleteChecklist"></checklist>
          </div>
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
import checklist from './checklist.vue'
export default {
  async mounted(){
    await this.GetChecklistByCardId()
  },
  props: {
    isVisible: Boolean,
    card: Object
  },
  data() {
    return {
      popup_card: { ...this.card},
      ParameterIsOpen: false,
      list_checklist : []
    }
  },
  methods: {
    updateFirst(event) {
      var container = document.getElementById('container')

      if (container) {
        container.style.backgroundColor = event.target.value;
      }
    },
    async DeleteChecklist(data){
      this.list_checklist.forEach((obj) => {
        if (obj.id == data){
            const index = this.list_checklist.indexOf(obj)
            const debug = this.list_checklist.splice(index, 1)
          }
      })
      try {
        const deleteChecklist = await $fetch("/api/checklist/checklist", {
          method: 'DELETE',
          body: {
            id: data
          }
        })
        console.log(deleteChecklist)
      }catch (error) {
        console.log(error)
      }
    },
    async AddChecklist(){
      this.list_checklist.push( {
        id: null,
        cardsId: this.card.id,
        isFinished: false,
        title: ""
      })
      try {
        const addChecklist = await $fetch("/api/checklist/checklist", {
          method: "POST",
          body: {
            cardsId: this.card.id,
          }
        })
        this.list_checklist[this.list_checklist.length - 1].id = addChecklist.id;
        this.GetChecklistByCardId()
      } catch (error) {
        console.log(error)
      }
    },
    async GetChecklistByCardId() {
      try {
        const getChecklist = await $fetch("/api/checklist/checklist", {
          method: "GET",
          params: {
            card: this.card.id
          }
        })
        console.log(getChecklist)
        this.list_checklist = getChecklist
          } catch (error) {
            console.log(error)
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
    async ChangeTitleChecklist(data){
      this.list_checklist.forEach((obj) => {
        if (obj.id == data.id){
            const index = this.list_checklist.indexOf(obj)
            this.list_checklist[index].title = data.title
          }
      })
      try {
            const ChangeTitleChecklist = await $fetch("/api/checklist/checklist", {
            method: "PUT",
            body: {
                id: data.id,
                title: data.title
            }
        })
        }catch (error) {
            console.log(error)
        }
    }
  },
  components: {
      checklist
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
    background-color: #f1f2f4;
    position: relative;
    width: 50%;
    margin: 5vh auto;
    border-radius: 10px;
    z-index: 1500; 
    box-shadow: 0 0 10px rgba(0,0,0,0.5); 
  }

  .main div{
    background-color: #f1f2f4;
    text-align: center;
    width: 90%;
    margin: 30px auto;
    padding: 10px;
    min-height: 100%;
  }

  .main {
    overflow-y: auto;
    /* overflow-x: none; */
    max-height: 90vh
  }

  #header {
    height: 5vh;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 0 0 10px rgba(0,0,0,0.5); 
    display: flex;
  }

  #header h1 {
    font-weight: bold;
    font-size: 1.3rem;
    margin: auto
  }

  #description {
    height: 30vh;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 0 0 10px rgba(0,0,0,0.5); 
  }

  #description textarea {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    resize: none;
    padding: 10px;
  }

  #checkbox {
    min-height: 50vh;
    display: block;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 0 0 10px rgba(0,0,0,0.5); 
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
    z-index: 1700;
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
    z-index: 1700;
    position: absolute;
    right: 50px;
    top: 0;
  }


  #btn_parameter {
    width: 50px;
    height: 50px;
    padding: 2px;
    border: 1px solid black;
    border-radius: 150px;
    background-color: white;
  }

  .list-checkbox {
    display: inline-block;
    min-height: auto;
  }
</style>