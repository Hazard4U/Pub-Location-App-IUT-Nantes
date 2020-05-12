# beerIUT
 ![npm](https://img.shields.io/badge/npm-6.14.5-blue) 
 ![node](https://img.shields.io/badge/node-12.16.3-brightgreen)
 ![ubuntu](https://img.shields.io/badge/ubuntu-18.04-red)

 
 
Projet final dans le cadre des matières "Technologies pour la production de logiciels"(m4105C) et "Programmation web client riche"(m4103C).
Ce projet a pour objectif de rassembler les connaissances acquises dans le cadre de ces matières en Javascript côté serveur avec NodeJS pour la première
et avec le framework Vue côté client pour la seconde.

---

### Node
- #### Node installation sur Windows

  Il suffit d'aller sur le site officiel Node.js (https://nodejs.org/) et de télécharger l'installateur.
  Assurez-vous également que "git" est disponible dans votre PATH, "npm" pourrait en avoir besoin (vous pouvez trouver git [ici](https://git-scm.com/)).

- #### Node installation sur Ubuntu

  Vous pouvez installer facilement les nodejs et npm avec apt install, il suffit d'exécuter les commandes suivantes.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Autres OS
  Vous pouvez trouver plus d'informations sur l'installation sur le site officiel Node.js (https://nodejs.org/) et le site officiel NPM (https://npmjs.org/).

Si l'installation a réussi, vous devriez être en mesure d'exécuter la commande suivante.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

Si vous avez besoin de mettre à jour `npm`, vous pouvez le faire en utilisant `npm` ! C'est cool, non ? Après avoir exécuté la commande suivante, il suffit d'ouvrir à nouveau la ligne de commande et d'être content.
    
    $ npm install npm@latest -g


---

## Installation
- ### Projet

```shell script
    $ unzip projet_JS_Deldicque_Martel.zip
    $ cd beerIUT
    $ npm install
```
    
- ### Extension navigateur internet

Afin de pouvoir requêter l'API de Google en étant en localhost (CORS issue) nous avons trouver le moyen de faire fonctionner 
le requêtage en passant par l'installation d'une extension sur le navigateur.

1. #### Pour Google Chrome : 
    "Allow CORS" ==> extension présente dans le Chome Web Store disponible [ici](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=fr)
2. #### Pour Firefox : 
    "CORS Everywhere" ==> extension présente sur addons.mozilla.org disponible [là](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/?src=search)

## Configurer l'application
Si vous désirez changer le port par défaut (i.e "3000") 

Ouvrez `beerIUT/server.js` et éditez la ligne suivante en remplaçant la dernière valeur par le port désiré. 

```javascript
const port = process.argv[2] || 3000;
```

## Lancer l'application

    $ node server.js

Puis connectez-vous sur `http://localhost:3000/` sous réserve que vous ayez laisser le port par défaut, 
sinon référez vous au paragraghe précédent.

## Présentation des choix technologiques et des fonctionnalité implémentées
Nous avons fait le choix d'implémenter Vue.JS, pour répondre aux attentes du cours de client riche, où l'utilisation d'un framework était demandé.

Cette implémentation nous a demandé de "refacto" notre projet pour passer d'un routage des pages web côté serveur au côté client. Ce qui permet à notre serveur de servir au client uniquement une seule page "index.html" où Vue intègre un routeur qui sert la page d'accueil ou la page d'information au besoin.

Pour faciliter, accélérer le développement avec Vue nous avons intégré au projet, Vuetify.

Nous utilisons différentes API :
1. Leaflet, permet de récupérer une carte.
2. OpenWeather, permet de récupérer la météo sur une ville.
3. Google AutoComplete, permet de récupérer une adresse à partir d'une recherche.
4. Bière, permet de récupérer des bières et brasseries, api fait maison.

Notre projet grâce à ces apis, nous permet de rechercher une ville aidé par une autocomplétion.<br>
Cette recherche nous emmène sur une page où l'on peut voir la météo et l'heure actuelle du lieu recherché.<br>
L'heure est calculée grâce à la timezone renvoyée par OpenWeather.
En plus de ces fonctionnalités, les brasseries présentes dans un rayon de 20Km de la ville recherchée sont affichées sur la carte et dans la liste.<br>
Un survol de la souris sur les brasseries permet d'afficher une pop-up contenant le nom de la brasserie.<br>
Pour chaque brasserie il est possible d'accéder au site internet et au téléphone.<br>
Il est possible de sélectionner une brasserie, cela permet d'apercevoir toutes les bières disponibles et de rejoindre le chat.

Le projet intègre aussi un petit système de session très simple en faisant abstraction des contraintes de sécurité et d'optimisation, c'est à dire que le serveur fourni une session au client grâce à un identifiant mais sans authentification et ne gère pas les fin de session.<br>
Ce petit système peut se voir côté client avec les couleurs de chat pour les utilisateurs, une couleur est propre à une session.

## Présentation de la structure côté serveur ![m4105c](https://img.shields.io/badge/Serveur-m4105c-green)

### 1. Requêter l'API (celles nous étant utiles sur le projet - descriptif complet dans le fichier `test.sh`)
- #### API beerRoutes
    
    |  Methode  |          URL             | Description                                               |
    |:----------|:-------------------------| :---------------------------------------------------------|
    | GET       | /api/beerRoutes/         | Récupérer toutes les bières                               |
    |           | /api/beerRoutes/:id      | Récupérer une bière par identifiant unique                |
    |           | /api/beerRoutes/deg/:deg | Récupérer les bières par degré d'alcool égal ou supérieur |
    
- #### API breweryRoutes
    
    |  Methode  |          URL                | Description                     |
    |:----------|:----------------------------| :-------------------------------|
    | GET       | /api/breweryRoutes/         | Récupérer toutes les brasseries |
    |           | /api/breweryRoutes/:id      | Récupérer une brasserie par identifiant unique |
    |           | /api/beerRoutes/near?lat=`{lat}`&long=`{long}`&radius=`{radius}` | Récupérer les brasseries présentes dans un rayon défini avec {lat} ==> la latitude, {long} ==> la longitude et {rad} ==> le rayon désiré |
    
    **error answer code** : {"errorCode":21,"message":"Entity not found"}
    
    **success answer code** : {"id":100,"breweries":"Bell's Brewery Inc.","address1":"8938 Krum Ave.","address2":"","city":"Galesburg","state":"Michigan","code":"49053","country":"United States","phone":"269.382.2338","website":"...","filepath":"","descript":"In ...","last_mod":"2010-07-22T22:00:20+02:00","coordinates":"42.2843,-85.4538"}
    
- ### API webRoutes
    
    |  Methode  |            URL          | Description                   |
    |:----------|:------------------------| :-----------------------------|
    | GET       | /api/webRoutes/         | Fournit le fichier index.html |
    |           | /api/webRoutes/login?search=`{adresse}`      | Renvoie les données de connexion cliente après avoir précisé une ville à la place de la variable {adresse} |
    

###2. Partie Sockets
Le client établit la connexion avec le serveur au chargement de l'index.html, 

## Présentation de la structure côté client ![m4103c](https://img.shields.io/badge/Client-m4103c-yellow)


