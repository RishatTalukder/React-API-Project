import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context/GlobalContext";
import axios from "axios";
import Loading from "../components/Loading";
import {
  SET_SINGLE_LOADING,
  SET_SINGLE_ERROR,
  SET_DETAILS,
} from "../context/reducer";
import { formatCocktailDetails } from "../context/reducer";
import CocktailDetails from "../components/CocktailDetails";
const SingleCocktail = () => {
  const { singleLoading, singleError, details, dispatch } = useAppContext();
  const { id } = useParams();

  const fetchCocktailDetails = async () => {
    dispatch({ type: SET_SINGLE_LOADING, payload: true });
    dispatch({ type: SET_SINGLE_ERROR, payload: null }); // Reset previous error
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = response.data.drinks;
      if (data && data.length > 0) {
        const cocktailDetails = formatCocktailDetails(data[0]);
        dispatch({ type: SET_DETAILS, payload: cocktailDetails });
      } else {
        dispatch({
          type: SET_SINGLE_ERROR,
          payload: {
            type: true,
            message: "No cocktail found for this ID.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_SINGLE_ERROR,
        payload: {
          type: true,
          message: "Error fetching cocktail details. Please try again later.",
        },
      });
    } finally {
      dispatch({ type: SET_SINGLE_LOADING, payload: false });
    }
  };

  useEffect(() => {
    fetchCocktailDetails();
  }, [id]);

  if (singleLoading) {
    return <Loading />;
  }

  if (singleError) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {singleError.message}
      </div>
    );
  }

  return (
    <>
      {!singleLoading && !singleError && details ? (
        <CocktailDetails details={details} />
      ) : (
        <div className="alert alert-warning text-center mt-5" role="alert">
          No cocktail details available.
        </div>
      )}
    </>
  );
};

export default memo(SingleCocktail);
