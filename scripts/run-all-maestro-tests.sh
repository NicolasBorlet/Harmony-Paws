#!/bin/bash

# Script pour exécuter tous les tests Maestro
# Utile pour la CI ou pour des tests complets manuels

echo "🎭 Exécution de tous les tests Maestro..."

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

# Compteurs pour les tests réussis/échoués
SUCCESS_COUNT=0
FAILURE_COUNT=0
TOTAL_COUNT=0

# Fonction pour exécuter les tests dans un dossier spécifique
run_tests_in_directory() {
    local dir=$1
    local title=$2

    echo -e "\n${YELLOW}📁 Exécution des tests ${title}...${NC}"

    # Compter le nombre de fichiers YAML dans le répertoire
    local count=$(find "$dir" -name "*.yaml" | wc -l)
    if [ "$count" -eq 0 ]; then
        echo -e "${YELLOW}⚠️  Aucun test trouvé dans ${dir}${NC}"
        return
    fi

    # Exécuter chaque test dans le répertoire
    for test in "$dir"/*.yaml; do
        if [ -f "$test" ]; then
            ((TOTAL_COUNT++))
            echo -e "\n${YELLOW}🚀 Exécution du test: ${test}${NC}"

            if maestro test "$test"; then
                echo -e "${GREEN}✅ Test réussi: ${test}${NC}"
                ((SUCCESS_COUNT++))
            else
                echo -e "${RED}❌ Test échoué: ${test}${NC}"
                ((FAILURE_COUNT++))
            fi
        fi
    done
}

# Exécuter les tests par catégorie
run_tests_in_directory "maestro/components" "de composants"
run_tests_in_directory "maestro/screens" "d'écrans"
run_tests_in_directory "maestro/flows" "de flows"

# Afficher le résumé
echo -e "\n${YELLOW}📊 Résumé des tests:${NC}"
echo -e "Total des tests: ${TOTAL_COUNT}"
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
