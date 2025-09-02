import React, { memo } from "react";
import { Link } from "react-router";
import { FaCocktail } from "react-icons/fa";

const CocktailItem = ({ cocktail }) => {
  const { id, name, image, category, alcoholic, glass } = cocktail;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            <strong>Category:</strong> {category}
          </p>
          <p className="card-text">
            <strong>Type:</strong> {alcoholic}
          </p>
          <p className="card-text">
            <strong>Glass:</strong> {glass}
          </p>
          <Link to={`/cocktail/${id}`} className="btn btn-primary">
            <FaCocktail /> Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default memo(CocktailItem);
