import React, { memo, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import CocktailList from "../components/CocktailList";
import { useAppContext } from "../context/GlobalContext";
import { SET_COCKTAILS, SET_LOADING, SET_ERROR } from "../context/reducer";

const Home = () => {
  const { cocktails, loading, error, dispatch } = useAppContext();

  const fetchCocktails = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const randomLetter = letters[Math.floor(Math.random() * letters.length)]; // Get a random letter
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${randomLetter}`
      ); // Make an API call to fetch cocktails with the random letter
      const data = response.data.drinks;
      if (data) {
        const newCocktails = data.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strCategory,
            strAlcoholic,
            strGlass,
            strInstructions,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            category: strCategory,
            alcoholic: strAlcoholic,
            glass: strGlass,
            instructions: strInstructions,
          };
        });
        dispatch({ type: SET_COCKTAILS, payload: newCocktails });
      } else {
        dispatch({ type: SET_ERROR, payload: true });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_ERROR, payload: true });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  useEffect(() => {
    if (!cocktails || cocktails.length === 0) {
      fetchCocktails();
    }
    // Only fetch if cocktails are not already loaded
  }, [cocktails]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="alert alert-danger">Something went wrong</div>;
  }

  return <CocktailList />;
};
export default memo(Home);
