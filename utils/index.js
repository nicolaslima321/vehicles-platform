export const isObjectsEqual =
  (firstObject, secondObject)=>
    JSON.stringify(firstObject) === JSON.stringify(secondObject);

export const refreshArrayMemoryReference = (array) => Array.from(array);
