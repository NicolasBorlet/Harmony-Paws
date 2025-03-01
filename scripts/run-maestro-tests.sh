#!/bin/bash

# Script pour exécuter une sélection minimale de tests Maestro
# Utile pour les hooks pre-push ou pour des tests rapides

echo "🎭 Exécution des tests Maestro essentiels..."

# Vérification que Maestro est installé
if ! command -v maestro &> /dev/null; then
    echo "❌ Maestro n'est pas installé. Veuillez l'installer avec:"
    echo "curl -Ls \"https://get.maestro.mobile.dev\" | bash"
    exit 1
fi

# Configuration des couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Vérification que l'application est déjà lancée ou qu'un émulateur/simulateur est disponible
echo -e "${YELLOW}⚠️  Assurez-vous qu'un émulateur/simulateur est en cours d'exécution${NC}"

# Liste des tests essentiels à exécuter
ESSENTIAL_TESTS=(
    "maestro/screens/login.yaml"
    "maestro/screens/signup.yaml"
)

# Compteur pour les tests réussis/échoués
SUCCESS_COUNT=0
FAILURE_COUNT=0

# Exécuter les tests essentiels
for test in "${ESSENTIAL_TESTS[@]}"; do
    echo -e "\n${YELLOW}🚀 Exécution du test: ${test}${NC}"

    if maestro test "$test"; then
        echo -e "${GREEN}✅ Test réussi: ${test}${NC}"
        ((SUCCESS_COUNT++))
    else
        echo -e "${RED}❌ Test échoué: ${test}${NC}"
        ((FAILURE_COUNT++))
    fi
done

# Afficher le résumé
echo -e "\n${YELLOW}📊 Résumé des tests:${NC}"
echo -e "${GREEN}✅ Tests réussis: ${SUCCESS_COUNT}${NC}"
echo -e "${RED}❌ Tests échoués: ${FAILURE_COUNT}${NC}"

# Sortir avec un code d'erreur si au moins un test a échoué
if [ $FAILURE_COUNT -gt 0 ]; then
    echo -e "\n${RED}❌ Certains tests ont échoué. Veuillez corriger les problèmes avant de continuer.${NC}"
    exit 1
else
    echo -e "\n${GREEN}✅ Tous les tests ont réussi!${NC}"
    exit 0
fi
