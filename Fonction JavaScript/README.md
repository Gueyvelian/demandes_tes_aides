# Mon Projet

Bienvenue sur cette plateforme d'aide administrative ! Ce site web est conçu pour vous accompagner dans vos démarches administratives en France. Que vous soyez étudiant, salarié, voyageur ou propriétaire, vous trouverez ici des guides pratiques, des conseils juridiques et des informations essentielles pour simplifier vos procédures officielles.

## Fonctionnalités

- Onglet "Poser une question" avec création de compte, connexion, et pose de questions.
- Les 2 premières questions sont gratuites, puis 3,80€ par question supplémentaire.
- Compte Premium mensuel : 5,95€/mois, permet de poser des questions illimitées.
- Compte Premium annuel : 55€/an, permet de poser des questions illimitées.
- Après 12 renouvellements mensuels, un mois gratuit est offert.
- Limite de 2 comptes par ordinateur (basé sur l'adresse IP).
- Base de données SQLite pour persister les données.

## Catégories disponibles

Voici une présentation détaillée des catégories disponibles sur la plateforme, avec leurs sous-catégories respectives :

- **Démarche administrative en ligne** : Guides pour effectuer vos procédures administratives via internet.
  - Aide à l'allocation logement (APL) : Informations sur l'aide financière pour réduire le loyer.
  - Prime d'activité : Détails sur cette aide complémentaire aux revenus pour les travailleurs.
  - Déclaration des impôts : Étapes pour déclarer vos revenus en ligne.
  - Carte d'identité : Procédure pour obtenir ou renouveler votre carte d'identité.
  - Passeport : Demande et renouvellement de passeport.
  - Permis de conduire : Inscription et obtention du permis de conduire.

- **Droit des étudiants** : Conseils juridiques et aides spécifiques aux étudiants.
  - Bourses d'études : Conditions et démarches pour obtenir des bourses.
  - Logement étudiant : Aides et conseils pour trouver un logement adapté.
  - Contrat d'études : Informations sur les contrats sociaux étudiants.
  - Aide sociale : Supports financiers d'urgence pour les étudiants.

- **Droit du travail** : Informations sur vos droits en tant que salarié.
  - Contrat de travail : Rédaction, clauses et obligations légales.
  - Licenciement : Procédures, motifs et recours possibles.
  - Congés payés : Droits, calcul et prise de congés.
  - Salaire minimum : Le SMIC et ses implications.

- **Motifs d'infraction** : Explications des infractions courantes et leurs conséquences juridiques.

- **Droit routier** : Règles et obligations pour les conducteurs.
  - Permis de conduire : Obtention, catégories et renouvellement.
  - Règles de circulation : Code de la route et sécurité routière.
  - Amendes : Types d'infractions et montants des sanctions.
  - Assurance auto : Obligations et choix d'assurances.

- **Assurance et démarches téléphoniques** : Guides pour souscrire à une assurance et effectuer des démarches par téléphone.

- **Droit en voyage** : Droits des voyageurs et protections lors de déplacements.
  - Annulation de vol : Compensations et recours en cas d'annulation.
  - Perte de bagage : Procédures d'indemnisation.
  - Bagage endommagé : Réclamations et réparations.
  - Retard de vol : Droits à assistance et compensations.

- **Outils gratuits pour les étudiants** : Ressources et outils en ligne gratuits pour faciliter les études.

- **Démarche pour obtenir la retraite** : Étapes pour demander et obtenir sa retraite.

- **Droit des propriétaires** : Droits et obligations des propriétaires immobiliers.

- **Droit de la famille** : Informations sur le mariage, divorce, garde d'enfants et autres aspects familiaux.

- **Droit immobilier** : Conseils pour l'achat, la vente et la location de biens immobiliers.

## Comment utiliser le site

1. Ouvrez la page d'accueil pour une vue d'ensemble.
2. Cliquez sur un onglet correspondant à votre besoin.
3. Explorez les boutons sous chaque onglet pour des informations détaillées.
4. Utilisez le bouton "Retour" pour revenir en arrière si nécessaire.
5. Cliquez sur l'icône maison (🏠) pour retourner à l'accueil à tout moment.

Ce site est une ressource gratuite pour vous aider à naviguer dans le monde des administrations françaises. Pour des conseils personnalisés, consultez les sites officiels mentionnés dans les descriptions.

## Installation et exécution du serveur

Pour utiliser la fonctionnalité "Poser une question" avec base de données :

1. Assurez-vous d'avoir Node.js installé (https://nodejs.org/).

2. Installez les dépendances :
   ```
   npm install
   ```

3. Démarrez le serveur :
   ```
   npm start
   ```

4. Ouvrez votre navigateur à http://localhost:3000.

La base de données SQLite sera créée automatiquement.