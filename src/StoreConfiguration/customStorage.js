import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  const data = {}; // Use an object for key-value storage
  return {
    getItem(key) {
      return Promise.resolve(data[key] || null);
    },
    setItem(key, value) {
      data[key] = value;
      return Promise.resolve(value);
    },
    removeItem(key) {
      delete data[key];
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
