# Lunastra — Architecture V1

Statut : fondations locales, non publiées. Le prototype interactif précédent est conservé dans `reference/`. Ce dépôt n'est pas encore une V1 utilisable avec de vrais comptes.

## Décisions

- React 19, TypeScript et routage App Router via le starter Vinext disponible. Construction Workers ; code versionnable sur GitHub. GitHub sert à versionner le code ; un hébergement avec serveur sera nécessaire pour les comptes et la base. GitHub Pages seul n'exécute pas cette architecture serveur.
- Modules métier indépendants du rendu : naissance, calculs, résultats, interprétations. Les valeurs calculées et les textes symboliques sont séparés.
- SQLite/D1 avec migrations Drizzle pour les profils, notes, favoris et résultats. Pas de stockage local comme source de vérité pour les données utilisateur.
- Authentification publique derrière un adaptateur serveur, refus par défaut tant qu'il n'est pas branché. Aucun mot de passe maison. Le choix et le branchement du prestataire restent à faire ; les en-têtes d'identité du navigateur ne sont jamais acceptés comme preuve.
- PWA : manifeste initial. Icônes, installation et service worker restent à intégrer et tester après choix de l'origine HTTPS. Le cache hors ligne sera limité aux ressources publiques ; ni réponses personnelles, ni carnet, ni authentification ne doivent être mis dans un cache partagé.

## Parcours et routes

`/` → `/inscription` ou `/connexion` → profil de naissance → `/espace/accueil`.

Les autres sections de `/espace/` : astrologie, astrologie-chinoise, numerologie, cycles, carnet, annee, semaine, quotidien, spiritualite, profil. `/apercu` liste la structure. Les routes personnelles redirigent actuellement vers la connexion. `/api/me` retourne 401 sans identité vérifiée.

## Dépendances

Interface → services métier → calculs et dépôts de données.

Le serveur extrait l'identité de la session, puis la transmet aux dépôts. Toutes les opérations de carnet filtrent par `user_id`. Le corps de la requête ne peut pas choisir ce propriétaire. Les futures mutations vérifieront aussi l'origine/CSRF selon le fournisseur de session et les conflits de version.

## Données

- users : identité externe associée à un identifiant interne, sans mots de passe.
- profiles : naissance, précision de l'heure, coordonnées, fuseau IANA, préférences et révision.
- journal_entries : texte, humeur, propriétaire, date de modification.
- favorites : référence éditoriale et propriétaire, paire unique.
- calculations : résultat, version du moteur et révision du profil, clé de cache unique par utilisateur.

La suppression d'un utilisateur cascade vers ses données. La suppression chez le fournisseur d'identité et la politique de rétention des sauvegardes devront être intégrées avant ouverture publique. Le journal ne sera pas fourni aux moteurs d'interprétation.

## Calculs et sources

La numérologie implémente la réduction à 1–9, sans maîtres nombres ; la méthode est versionnée et testée. Il ne s'agit pas d'une validation scientifique de la numérologie.

Les moteurs occidental, chinois et lunaire exposent des contrats typés et renvoient `unavailable`, jamais des valeurs fictives. Le choix des éphémérides, des licences et des calendriers reste à documenter. Aucun service payant n'a été souscrit.

Chaque résultat complet portera sa méthode, sa version, son horodatage, ses sources et ses limites. Une heure inconnue ne doit pas produire un ascendant/maisons inventés. Une heure approximative doit conserver sa qualification. Le géocodage et le fuseau historique doivent être résolus avant conversion UTC, avec gestion des heures ambiguës/inexistantes.

Les lectures quotidiennes, hebdomadaires et annuelles seront demandées à partir de dates civiles dans le fuseau actuel. Le cache dépendra de la révision du profil, des méthodes, de la période et du fuseau. Un changement de naissance invalidera l'ancien résultat. Les saisons et les soins utiliseront l'hémisphère actuel, distinct du lieu de naissance.

## Ordre de réalisation

1. Prestataire de compte, sessions, vérification de l'adresse et déconnexion ; protection serveur et tests d'isolation.
2. Profil, résolution du lieu/fuseau, API carnet et favoris, suppression/export des données.
3. Calculs astronomiques/lunaires et comparaison avec jeux de références ; numérologie documentée ; calendrier chinois et conventions.
4. Contenus sourcés, lectures par période et personnalisation selon les préférences.
5. PWA et ergonomie iPhone/Android, tests complets à deux comptes, hébergement de la V1.

## Sources de cette architecture

Les décisions produit viennent des demandes d'Ambre et du prototype validé dans cette conversation. Les choix d'implémentation s'appuient sur le starter installé, son `package-lock.json`, et les guides Sites fournis dans l'environnement : `environment.md`, `authentication.md`, `persistence-and-storage.md`, `sqlite.md`. Ce sont des références locales de construction ; aucune source astrologique n'est encore intégrée ou revendiquée.
