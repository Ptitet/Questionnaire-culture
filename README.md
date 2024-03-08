# Questionnaire sport et culture

Questionnaire de culture sur le thème du sport, en HTML, CSS et JavaScript.

## Fonctionnalités

- Vérification des réponses et indication du score à la fin
- Facilité de modification des questions et de leur(s) réponse(s)
- Chat avec l'IA [Mixtral](https://mixtral.replicate.dev/) disponible en cas de difficulté
- Interface aux petits oignons

## Résolution de problèmes

### Le questionnaire ne fonctionne pas dans Chrome

L'import des fichiers JavaScript (`index.js` et `verify.js`) ne fonctionne pas lorsque que `index.html` est ouvert sur Chrome avec le protocole `file://`, pour des raison du [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS). Il faut donc soit utiliser un serveur web pour accéder au projet via Chrome, soit utiliser Firefox. Pour plus d'info voir ce [post](https://stackoverflow.com/a/25914800).
