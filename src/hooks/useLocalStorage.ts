const useLocalStorage = () => {
  const setItem = (key: string, values: any) =>
    localStorage.setItem(key, JSON.stringify(values));

  const getItem = (key: string) =>
    JSON.parse(localStorage.getItem(key) || "{}");

  return {
    setItem,
    getItem,
  };
};

export { useLocalStorage };
