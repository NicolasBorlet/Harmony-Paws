// Fonction pour transformer dbData en format graphique
export const transformDataForGraph = (
  dbData: Array<{ height: number; date: number }>,
) => {
  // Transformer directement les données en format graphique
  const graphData = dbData.map(item => {
    const date = new Date(item.date * 1000)

    return {
      x: date.getTime(), // Utiliser le timestamp en millisecondes pour l'axe x
      y1: item.height,
      year1: date.getFullYear(),
    }
  })

  // Trier les données par date
  return graphData.sort((a, b) => a.x - b.x)
}
