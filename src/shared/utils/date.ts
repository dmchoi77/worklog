export const getTodayDate = () => {
  const date = new Date();
  const todayDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;

  return todayDate;
};
