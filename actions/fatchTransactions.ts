export const fetchAllTransactions = () => {
  const res = fetch(`${process.env.HOST}/api/transection/admin/all`);
  const data = res.json();

  return data;
};
