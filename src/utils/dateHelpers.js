export const getRelativeTime = (dateString) => {
  if (!dateString) return 'Fecha no disponible';

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  // Si es menos de 1 minuto
  if (diffInSeconds < 60) {
    return 'Ahora mismo';
  }

  // Si es menos de 1 hora
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  }

  // Si es menos de 24 horas
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }

  // Si es menos de 7 días
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
  }

  // Si es menos de 30 días
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInDays < 30) {
    return `Hace ${diffInWeeks} ${diffInWeeks === 1 ? 'semana' : 'semanas'}`;
  }

  // Si es menos de 12 meses
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Hace ${diffInMonths} ${diffInMonths === 1 ? 'mes' : 'meses'}`;
  }

  // Más de un año, mostrar fecha completa
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const getFormattedDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';

  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
