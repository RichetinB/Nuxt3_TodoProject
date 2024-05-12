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
```

3. Configurer la base de données :
   
   - Créer le fichié .env et copier le contenue ci-dessous