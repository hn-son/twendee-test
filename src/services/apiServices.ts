export const getUserApi = async (page: number, rows: string) => {
  const res = await fetch(
    `https://randomuser.me/api/?page=${page}&results=${rows}`
  );
  const data = await res.json();
  return data.results;
};
