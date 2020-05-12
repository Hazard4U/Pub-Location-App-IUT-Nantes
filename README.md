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
    $ git clone https://gitlab.com/Hazard4U/beeriut.git
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


### Présentation de la structure (m)

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

- ### API webRoutes
    
    |  Methode  |            URL          | Description                   |
    |:----------|:------------------------| :-----------------------------|
    | GET       | /api/webRoutes/         | Fournit le fichier index.html |
    |           | /api/webRoutes/login?search=`{adresse}`      | Renvoie les données de connexion cliente après avoir précisé une ville à la place de la variable {adresse} |
    




