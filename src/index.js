const setIn = (obj, path, value) => {
  if (path.length == 0 || typeof path.splice == 'undefined' || typeof path[0] == 'undefined') return value;
  let key = path.splice(0, 1);
  if (isPrototypePolluted(key) || typeof obj[key] == 'undefined') obj[key] = {};
  obj[key] = setIn(obj[key], path, value);

  return obj;
};

const isPrototypePolluted = (key) => /__proto__|constructor|prototype/.test(key);

export default setIn;
