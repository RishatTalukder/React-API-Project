export const SET_COCKTAILS = "SET_COCKTAILS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_DETAILS = "SET_DETAILS";
export const SET_SINGLE_LOADING = "SET_SINGLE_LOADING";
export const SET_SINGLE_ERROR = "SET_SINGLE_ERROR";
export const formatCocktailDetails = (item) => {
  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
  } = item; // destructuring the item object
  return {
    id: idDrink,
    name: strDrink,
    image: strDrinkThumb,
    category: strCategory,
    alcoholic: strAlcoholic,
    glass: strGlass,
    instructions: strInstructions,
    ingredients: [
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
    ].filter(Boolean), // filtering out any null or undefined ingredients
    measures: [
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
    ].filter(Boolean), // filtering out any null or undefined measures
  };
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === SET_COCKTAILS) {
    return { ...state, cocktails: payload, loading: false, error: false };
  }

  if (type === SET_LOADING) {
    return { ...state, loading: payload };
  }

  if (type === SET_ERROR) {
    return { ...state, error: payload };
  }

  if (type === SET_DETAILS) {
    return { ...state, details: payload, singleLoading: false, singleError: false };
  }
  if (type === SET_SINGLE_LOADING) {
    return { ...state, singleLoading: payload };
  }

  if (type === SET_SINGLE_ERROR) {
    return { ...state, singleError: payload };
  }

  throw new Error(`No matching action type: ${type}`); // This will throw an error if the action type is not recognized.
};
