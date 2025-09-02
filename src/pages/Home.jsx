import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import CocktailList from "../components/CocktailList";
import { useAppContext } from "../context/GlobalContext";
import { SET_COCKTAILS, SET_LOADING, SET_ERROR } from "../context/reducer";

const Home = () => {
  const { cocktails, loading, error, dispatch } = useAppContext();
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const randomLetter = letters[Math.floor(Math.random() * letters.length)]; // Random letter for initial search
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCocktails = async (term) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`
      );
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
        dispatch({
          type: SET_ERROR,
          payload: {
            type: true,
            message: "No cocktails found for the search term.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_ERROR,
        payload: {
          type: true,
          message: "Error fetching cocktails. Please try again later.",
        },
      });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    if (!cocktails || cocktails.length === 0) {
      fetchCocktails(randomLetter); // Default search term
    }
  }, [cocktails]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchCocktails(searchTerm);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for cocktails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>


      {/* checking for loading, error, and cocktails */}
      {loading && <Loading />}
      {error && (
        <div className="alert alert-danger">
          {error.message || "An error occurred while fetching cocktails."}
        </div>
      )}
      {cocktails && cocktails.length > 0 ? (
        <CocktailList cocktails={cocktails} />
      ) : (
        !loading && <div className="alert alert-info">No cocktails found</div>
      )}
    </>
  );
};
export default memo(Home);