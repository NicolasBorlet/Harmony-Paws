function dateToHours(date: Date): string {
  return `${date.getHours()}h${date.getMinutes()}`
}

function dateToDay(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days ago`;
}

export { dateToDay, dateToHours };

