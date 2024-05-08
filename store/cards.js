import { defineStore } from 'pinia';

export const useCardsStore = defineStore('cards', {
    state: () => ({
      cardTitle: '',
    }),
    actions: {
      setCardTitle(title) {
        this.cardTitle = title;
      },
      async updateCardTitle(title) {
        // Ici, vous pouvez faire une requête fetch PUT pour mettre à jour le titre sur le serveur
        // Mettons à jour l'état après la mise à jour sur le serveur
        this.setCardTitle(title);
      }
    }
  });