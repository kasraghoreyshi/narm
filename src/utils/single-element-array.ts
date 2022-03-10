//TODO: This needs a better name.
//? It just converts an any | any[] to any
//? Which is useful for returning a single flag alias for example.
export const getSingleElementArray = (input: any | any[]) => {
  if (Array.isArray(input)) {
    return input[0];
  }
  return input;
};
