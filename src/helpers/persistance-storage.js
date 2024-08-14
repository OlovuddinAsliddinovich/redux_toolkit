export const setItem = (key, data) => {
  try {
    return localStorage.setItem(key, data);
  } catch (error) {
    console.log("Error saving data to localstorage!");
  }
};

export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log("Error getting data from localstorage!");
  }
};

export const removeItem = (key) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    console.log("Error removed data from localstorage!");
  }
};

export const setModeItem = (key, data) => {
  try {
    return localStorage.setItem(key, data);
  } catch (error) {
    console.log("Error saving data to localstorage!");
  }
};

export const getModeItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};
