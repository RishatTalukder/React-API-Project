export const SET_COCKTAILS = "SET_COCKTAILS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

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

  throw new Error(`No matching action type: ${type}`); // This will throw an error if the action type is not recognized.
};
