# Lunastra — socle V1

Architecture locale, non publiée. Lire `docs/ARCHITECTURE.md` pour les décisions, les limites et les étapes restantes.

## Démarrage

Node >= 22.13. Installer avec `npm ci`, puis `npm run dev`. Construire avec `npm run build`. Le projet utilise Vinext et Cloudflare Workers ; il ne constitue pas un export pour GitHub Pages.

`npx tsc --noEmit` contrôle les types. `node --import tsx --test tests/domain.test.ts` exécute les tests (tsx fourni par les dépendances du starter). `npm run db:generate` régénère les migrations après modification du schéma. Ne pas modifier une migration déjà appliquée.

## État

Routes et modules métier créés ; schéma et migration préparés ; calcul numérologique fonctionnel ; dépôt de carnet préparé et filtré par propriétaire. Aucun service de compte public, moteur astronomique, géocodage ou stockage distant branché. Les routes privées restent fermées. PWA : manifeste initial, installation non finalisée.

Le prototype HTML validé est conservé comme référence, pas comme interface de production. Aucune donnée personnelle n'est incluse.
