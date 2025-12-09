// Utility function to format a Date object into a readable string.
export function getIntlFormattedDate(locale: Intl.Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date().toLocaleDateString(locale, options);
}

export function getFormattedDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString('de', { month: 'long' });
  //const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}. ${month}, ${hours}:${minutes}`;
}