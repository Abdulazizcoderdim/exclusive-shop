export const useNowDate = (): string => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0'); // Kun
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Oy (0 - yanvar)
  const year = date.getFullYear(); // Yil

  return `${day}/${month}/${year}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Kun
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Oy (0 - yanvar)
  const year = date.getFullYear(); // Yil

  return `${day}/${month}/${year}`;
};
