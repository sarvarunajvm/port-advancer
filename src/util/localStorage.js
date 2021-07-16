export const setItem = (key, item) => {
  window.localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

export const checkAndSetItem = (key,item) =>{
  let oldVal = getItem(key);
  if(!oldVal || oldVal === 'null' || oldVal === 'undefined'){
    setItem(key,item);
  }
};