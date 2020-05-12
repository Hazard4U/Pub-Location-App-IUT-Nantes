#!/bin/sh

#Affichage des brasseries
echo '------------------------------------------------------------------------------'
echo "Affichage des brasseries"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une' brasserie par ID"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/100
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une brasserie par ID inexistant"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/15624
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des brasseries dans un rayon défini"
echo "ceci en passant en paramètres une latitude, une longitude et un rayon"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/near?lat=51.4611&long=-0.1966&radius=15000"
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des brasseries dans un rayon défini ou il n'y a pas de brasseries"
echo "ceci en passant en paramètres une latitude, une longitude et un rayon"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/near?lat=47.2183&long=-1.5536&radius=15000"
echo
echo
echo '------------------------------------------------------------------------------'

#Affichage des bières
echo "Affichage de toutes les bières"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières par ID"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/56
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière par ID"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/56
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière par ID inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/56
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières par degré d'alcool supérieur"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/deg/5
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières par degré d'alcool supérieur inexistant"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/deg/56
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières par brasserie via l'ID de celle-ci"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/brewery/15
echo
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières par brasserie via une ID inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/brewery/156203
echo
echo
echo '------------------------------------------------------------------------------'

#Affichage des catégories
echo '------------------------------------------------------------------------------'
echo "Affichage des catégories"
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
echo
echo '------------------------------------------------------------------------------'

# Affichage