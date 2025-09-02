import React, { memo } from "react";
import CocktailItem from "./CocktailItem";
import { useAppContext } from "../context/GlobalContext";

const CocktailList = () => {
  const { cocktails } = useAppContext();

  return (
    <div className="row">
      {cocktails.map((cocktail) => (
        <CocktailItem key={cocktail.id} cocktail={cocktail} />
      ))}
    </div>
  );
};
export default memo(CocktailList);
