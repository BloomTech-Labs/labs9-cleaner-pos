export const generateDisplayDate = (dateString: string) => {
  if (!dateString) {
    return 'N/A';
  }
  const adjustedDate = new Date(dateString);
  const month = adjustedDate.getMonth() + 1;
  const day = adjustedDate.getDate();
  return `${month} / ${day}`;
};
