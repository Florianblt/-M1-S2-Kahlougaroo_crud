# Msql
**Docker & Dokcer Compose**
### Mise en place du Docker
1. Se déplacer dans le dossier mysql et faire la commande `docker-compose up -d`
2. Vérification du fonctionnement : `docker ps -a` 
3. Connexion au container : `docker exec -it <ID CONTAINER> bash`
4. Dans le container : `mysql -p` pour se connecter 
5. Copier/coller le contenu sql