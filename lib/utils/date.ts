function dateToHours(date: Date): string {
  return `${date.getHours()}h${date.getMinutes()}`
}

export { dateToHours }
