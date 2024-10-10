# Gestion des Utilisateurs - Projet Next.js
## Captures d'écran
![Screenshot 2024-10-10 144324](https://github.com/user-attachments/assets/ad1c9856-7e31-439c-bbc4-7322b9a25d0a)
![Screenshot 2024-10-10 144333](https://github.com/user-attachments/assets/3d711022-567c-4c75-a14a-95534816d18b)
![Screenshot 2024-10-10 152650](https://github.com/user-attachments/assets/63cbf017-ea35-470d-bcd7-991293f8a25f)
![Screenshot 2024-10-10 152311](https://github.com/user-attachments/assets/932830b4-0bc9-4d2a-8cae-4173e73edc80)
![Screenshot 2024-10-10 152237](https://github.com/user-attachments/assets/b3c7b024-bcba-4d98-852a-be91f5709c09)
![Screenshot 2024-10-10 152125](https://github.com/user-attachments/assets/e7d2968d-1592-4f74-b8e2-35b1742323aa)

## Description du projet

Ce projet est une application de gestion des utilisateurs qui permet de :
- Créer et authentifier des utilisateurs via OAuth2 (implémenté avec NextAuth.js version 5).
- Modifier les informations de l'utilisateur : Nom, Prénom, Date de naissance, Adresse, Numéro de téléphone.
- Vérifier que l'adresse de l'utilisateur se situe à moins de 50 km de Paris, en utilisant l'API `adresse.data.gouv.fr`.
- Utiliser des liens magiques par email pour l'authentification.
- Nettoyer automatiquement la base de données pour une gestion efficace des données.
- Permettre aux utilisateurs de lier/délier leurs comptes Google.
- Mettre en place un contrôle d'accès basé sur les rôles (Role-Based Access Control - RBAC).

## Technologies utilisées

- **Next.js** : Framework utilisé pour le développement front-end et back-end.
- **PostgreSQL** : Base de données relationnelle utilisée pour stocker les informations des utilisateurs et les données d'authentification.
- **NextAuth.js** : Librairie utilisée pour gérer l'authentification OAuth2, incluant les liens magiques et la liaison des comptes Google.
- **Mailtrap** : Outil utilisé pour tester les emails dans un environnement de développement.
- **TypeScript** : Langage de programmation utilisé pour la gestion des types et une meilleure maintenabilité du code.
- **SASS (SCSS)** : Préprocesseur CSS utilisé pour styler l'application.

## Fonctionnalités principales

- **Authentification OAuth2 avec NextAuth.js** : Les utilisateurs peuvent s'authentifier via des liens magiques ou lier leurs comptes Google.
- **Modification des informations utilisateur** : Les utilisateurs peuvent mettre à jour leurs données personnelles, y compris leur adresse, qui doit se situer à moins de 50 km de Paris.
- **API d'adresse** : Vérification de la distance de l'adresse par rapport à Paris grâce à l'API `adresse.data.gouv.fr`.
- **Nettoyage automatique de la base de données** : Pour assurer que la base de données reste efficace et propre.
- **Contrôle d'accès basé sur les rôles (RBAC)** : Les utilisateurs se voient attribuer des rôles pour gérer les permissions d'accès.

## Installation et Configuration 
### Cloner le projet
```bash
git clone https://github.com/arij01/superiamo-user-management.git
cd superiamo-user-management
```
### Installer les dépendances 
```bash
npm install
```
### Démarrer le serveur de développement 
```bash
npm run dev
```
## Utilisation

- Les utilisateurs peuvent s'inscrire et se connecter via OAuth2 ou des liens magiques.
- Ils peuvent modifier leurs informations personnelles, qui doivent respecter les contraintes de localisation par rapport à Paris.
- Les administrateurs ont accès à des fonctionnalités supplémentaires grâce au contrôle basé sur les rôles.

## Contributeurs

- **Arij M'hiri** - Développeuse 
