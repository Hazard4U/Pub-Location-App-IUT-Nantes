#!/bin/sh

#Affichage des catégorie
echo '------------------------------------------------------------------------------'
echo "Affichage des catégries"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première catégorie"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une catégorie inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/1234
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation de la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation d'un double la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"DemoUpdate","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Mise à jour de la catégorie 100 : $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT -d $body http://localhost:3000/api/categorie/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/100
echo
echo '------------------------------------------------------------------------------'
echo "Suppression de la catégoie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/100
echo
echo
echo '------------------------------------------------------------------------------'
echo "Suppression d'une catégorie inexistante 1234"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/1234
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/100
echo
