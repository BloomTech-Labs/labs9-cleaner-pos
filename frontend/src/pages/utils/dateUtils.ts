function separateDateString(dateString: string) {
  /*
  This function expects a date string input like this:
  '2019-01-27T08:00:00.000Z'
  returns {
      year: string,
      month: string,
      day: string;
  }
  */
  const [year, month, day, ...other] = dateString.split(/[-T]+/);

  return {
    year,
    month,
    day,
  };
}

export const generateDisplayDate = (dateString: string) => {
  if (!dateString) {
    return 'N/A';
  }
  const { month, day } = separateDateString(dateString);
  return `${month} / ${day}`;
};
