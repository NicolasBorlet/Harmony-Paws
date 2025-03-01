# Tests Maestro pour Harmony-Paws

Ce dossier contient les fichiers de test Maestro pour l'application
Harmony-Paws. Les tests sont organisés selon la structure suivante:

## Structure des fichiers

```
maestro/
├── README.md                  # Ce fichier
├── flows/                     # User stories complètes
│   ├── user-signup-login.yaml # Flow d'inscription et connexion
│   ├── add-dog-profile.yaml   # Flow d'ajout de profil de chien
│   └── ...
├── components/                # Tests de composants réutilisables
│   ├── login-form.yaml        # Test du formulaire de connexion
│   ├── signup-form.yaml       # Test du formulaire d'inscription
│   └── ...
└── screens/                   # Tests des écrans individuels
    ├── login.yaml             # Test de l'écran de connexion
    ├── signup.yaml            # Test de l'écran d'inscription
    ├── home.yaml              # Test de l'écran d'accueil
    └── ...
```

## Organisation des tests

- **components/** : Tests des composants UI réutilisables qui peuvent être
  intégrés dans plusieurs flows.
- **screens/** : Tests des écrans complets de l'application.
- **flows/** : Tests qui simulent des user stories complètes en combinant
  plusieurs actions.

## Conventions de nommage

- Les noms de fichiers utilisent le format kebab-case (mots en minuscules
  séparés par des tirets).
- Chaque fichier représente une tâche spécifique.
- Les fichiers de flow commencent par un verbe d'action (ex:
  `register-new-user.yaml`).

## Comment exécuter les tests

Pour exécuter un test spécifique:

```bash
maestro test maestro/screens/login.yaml
```

Pour exécuter tous les tests:

```bash
maestro test maestro/
```

## Bonnes pratiques

- Chaque test doit inclure des assertions pour vérifier que les actions ont été
  effectuées correctement.
- Utiliser des commentaires pour documenter les étapes importantes.
- Inclure des timeouts appropriés pour les opérations asynchrones.
