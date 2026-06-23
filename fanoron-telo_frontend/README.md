# Fanoron-telo avec IA

## Section 1 : En-tête Institutionnel et Identification

[Institut Supérieur Polytechnique de Madagascar](https://www.ispm-edu.com)

**Nom du groupe :** AllCode

| Nom Complet          | Numéro d'étudiant   | Classe   | Rôle précis             |
| -------------------- | ------------------- | -------- | ----------------------- |
| ANDRIANARINJANAHARY  | 03                  | ESIIA 4  | UI/UX Designer &        |
| Antsaniavo           |                     |          | Frontend Developer      |
| -------------------- | ------------------- | -------- | ----------------------- |
| RAKOTONDRAINIBE      | 04                  | ESIIA 4  | Lead & projet           |
| Michel Antonio       |                     |          | Architect               |
| -------------------- | ------------------- | -------- | ----------------------- |
| MIARIVOLA            | 11                  | ESIIA 4  | Release Manager         |
| Tiavina Nico         |                     |          |                         |
| -------------------- | ------------------- | -------- | ----------------------- |
| ANDRIAMBOLASOA       | 16                  | ESIIA 4  | Release Manager         |
| Radoniaina           |                     |          |                         |
| Fitahiana            |                     |          |                         |
| -------------------- | ------------------- | -------- | ----------------------- |
| ANDRIAMIHAJAMANANA   | 17                  | ESIIA 4  | Frontend Developer      |
| Mialitiana           |                     |          |                         |
| -------------------- | ------------------- | -------- | ----------------------- |
| RAVELONANAHARY       | 30                  | ESIIA 4  | UI/UX Designer          |
| Manjato              |                     |          |                         |
| -------------------- | ------------------- | -------- | ----------------------- |
| RAKELISAMIMANANA     | 39                  | ESIIA 4  | Lead IA                 |
| Faniriniaina         |                     |          |                         |
| Fifaliana            |                     |          |                         |
| -------------------- | ------------------- | -------- | ----------------------- |

---

## Section 2 : Description du Travail Réalisé

Application web complète du jeu traditionnel malgache **Fanoron-telo** avec intelligence artificielle intégrée.

**Fonctionnalités :**

- 5 modes de jeu : Humain vs Humain, Humain vs IA (3 niveaux), IA vs IA démo
- IA avec algorithme Minimax + élagage Alpha-Beta (niveau difficile)
- Système Undo/Redo complet
- Interface responsive mobile + desktop

**Stack technologique :**

- React 18 + Vite + Tailwind CSS
- Logique IA entièrement côté frontend (JavaScript pur)
- Aucune dépendance backend

**Version hébergée :**
https://fanoron-telo.vercel.app/

---

## Section 3 : Guide d'Installation Rapide

```bash
git clone <https://github.com/NaNantsa/TP_M1_Fanoron-telo_Avec_IA.git>
npm install
npm run dev
```

---

## Section 4 : Outils d'Aide IA Utilisés

| Outil              | Usage                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| Claude (Anthropic) | Architecture du projet, prompt Lovable, algorithme Minimax, gameLogic.js |
| GitHub Copilot     | Autocomplétion des fonctions d'adjacence et détection de victoire        |
| Lovable            | Génération initiale des composants React et du design                    |

**Gain de temps estimé :** ~65% sur la partie algorithmique IA et la structure des composants.

---

## Section 5 : Modélisation et Algorithmes de l'IA

**Représentation du plateau :**
Tableau JavaScript de 9 cases indexées 0–8 (null | "X" | "O").
Les connexions entre intersections sont définies dans une map d'adjacence statique.

```js
const ADJACENCY = {
  0: [1, 3, 4],
  1: [0, 2, 4],
  2: [1, 4, 5],
  3: [0, 4, 6],
  4: [0, 1, 2, 3, 5, 6, 7, 8], // centre connecté à tout
  5: [2, 4, 8],
  6: [3, 4, 7],
  7: [4, 6, 8],
  8: [4, 5, 7],
};
```

**Minimax avec Alpha-Beta :**

- Facile : Minimax profondeur 1
- Moyen : Minimax profondeur 3
- Difficile : Alpha-Beta profondeur 6, élagage des branches non prometteuses

**Fonction d'évaluation :**
+100 000 victoire IA
-100 000 victoire humain
+25 Prise du centre par IA
-25 Prise du centre par humain
+80 si victoire imminente (2 pions alignés sur 3 )
-100 si victoire imminente de humain
+2 si liberté de mouvement de l'IA après placement
-2 si liberté de mouvement de humain après placement

---

## Section 6 : Analyses de Performances

| Niveau    | Temps moyen par coup | Taux victoire IA vs IA Moyen |
| --------- | -------------------- | ---------------------------- |
| Facile    | < 5 ms               | ~25%                         |
| Moyen     | ~15 ms               | ~60%                         |
| Difficile | ~50 ms               | ~95%                         |

Métrique mesurée via `performance.now()` avant/après chaque appel `getBestMove()`, affichée en temps réel dans le mode IA vs IA.
