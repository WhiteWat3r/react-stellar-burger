export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const currentDateTime = new Date();

    const isToday = date.getDate() === currentDateTime.getDate();

    if (isToday) {
      return `Сегодня, ${date.toLocaleTimeString()}`;
    } else {
      return `${date.toLocaleDateString()}`;
    }
  }
