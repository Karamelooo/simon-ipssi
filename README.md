# simon-ipssi
# English
This is a Simon game developed for a JavaScript course project

The program is playable locally, or online with a scoreboard. To initialize the scoreboard, you must create a database access in /conf/config.php and create a table containing the followings fields : "name" (varchar), "score" (int), "stage" (int), "date" (date) and "ip" (varchar)

Data is submitted via an Ajax request at the game over if the "send result" checkbox is checked.

The scoreboard is refreshed in Ajax at page loading and at the beginning of each game.

The "New game" button allows you to start a game again without sending the current data to the server.

The speed of the game is multiplied exponentially at each stage.

Online version playable here:
https://hugo.agence-astrae.fr/ipssi/simon-game/

# Français
Jeu du simon développé pour un projet de cours en JavaScript

Le programme est jouable en local, ou en ligne avec un tableau des scores. Pour initialiser le tableau des scores, il faut créer un accès à une base de données dans /conf/config.php et créer une table contenant les champs "name" (varchar), "score" (int), "stage" (int), "date" (date) et "ip" (varchar)

Les données sont soumises via une requête Ajax à la fin d'une partie à condition que la checkbox "send result" est cochée.

Le tableau est rafraîchi en Ajax au chargement de la page et au début de chaque partie.

Le bouton "New game" permet de recommencer une partie sans envoyer les données actuelles au serveur.

La vitesse du jeu est multipliée de façon exponentielle à chaque étape.

Version en ligne jouable ici :
https://hugo.agence-astrae.fr/ipssi/simon-game/
