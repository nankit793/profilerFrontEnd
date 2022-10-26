export default {
  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (error) {
      return error;
    }
  },

  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return error;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      return error;
    }
  },

  clearStorage: () => {
    try {
      localStorage.clear();
    } catch (error) {
      return error;
    }
  },
};
