#!/bin/bash

# Récupère le nom de la branche actuelle
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Vérifie si la branche respecte le format HP-{nombre}/nom-de-la-branche
if [[ ! $BRANCH_NAME =~ ^HP-[0-9]+/.+$ ]]; then
    echo "⛔ Erreur : Le nom de votre branche doit respecter le format 'HP-{nombre}/nom-de-la-branche'"
    exit 1
fi
