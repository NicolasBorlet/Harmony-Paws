// Fonction pour transformer dbData en format graphique
export const transformDataForGraph = (
  dbData: Array<{ height: number | null; date: string }>,
) => {
  if (!dbData) return []

  // Filter out entries with null height and transform data
  const graphData = dbData
    .filter(item => item.height !== null)
    .map(item => {
      const date = new Date(item.date)
      return {
        x: date.getTime(),
        y1: item.height as number,
        year1: date.getFullYear(),
      }
    })

  // Sort data by date
  return graphData.sort((a, b) => a.x - b.x)
}
