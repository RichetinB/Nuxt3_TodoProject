# Projet ToDo

Ce projet est une application de gestion de tâches (ToDo) développée avec Nuxt 3 et Prisma.

## Fonctionnalités

- Création de compte utilisateur
- Modification du compte utilisateur
- Création, lecture, mise à jour et suppression de tâches
- Attribution de tâches à des utilisateurs
- Recherche d'utilisateurs par nom d'utilisateur
- Invitation d'utilisateurs à rejoindre une salle de travail
- Création, modification et suppression de salles de travail

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/RichetinB/Nuxt3_TodoProject.git
```

2. Installer les dépendances :

```
cd Nuxt3_TodoProject

npm install

npm uninstall @prisma/cli -g
npm install prisma -g

npm install nuxt

npm install -D @nuxtjs/google-fonts
```

3. Configurer la base de données :
   
   - Créer le fichié .env et copier le contenue ci-dessous
  
```
DATABASE_URL="file:dev.db"

JWT_ACCESS_TOKEN_SECRET = 'my_super_secret_for_access_token'
JWT_REFRESH_TOKEN_SECRET = 'my_super_secret_for_refresh_token'
```

4. Lancer l'application :

```
npm run dev
```
L'application sera accessible à l'adresse http://localhost:3000.

Il est également possible d'accédé à notre db via la commande ```prisma studio```

## Technologies utilisées

- Vue.js / Nuxt.js
- Prisma ORM

## Auteur

Ce projet a été développer par Baptiste RICHETIN, Mathéo BAYLE, Adryan COURTIAL