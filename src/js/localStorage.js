const load = key => {
  try {
    let serializedState = localStorage.getItem(key);

    return (serializedState = JSON.parse(serializedState) || undefined);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};


const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};


const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Remove state error: ', err);
  }
};

export { load, save, remove };