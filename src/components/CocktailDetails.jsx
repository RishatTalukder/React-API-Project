import React, { memo } from "react";
import { Link } from "react-router";
import { FaCocktail } from "react-icons/fa";

const CocktailDetails = ({ details }) => {
  const {
    id,
    name,
    image,
    category,
    alcoholic,
    glass,
    instructions,
    ingredients,
    measures,
  } = details;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-primary mb-4">
        <FaCocktail /> Back to Home
      </Link>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt={name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <p className="card-text">
                <strong>Category:</strong> {category}
              </p>
              <p className="card-text">
                <strong>Type:</strong> {alcoholic}
              </p>
              <p className="card-text">
                <strong>Glass:</strong> {glass}
              </p>
              <p className="card-text">
                <strong>Instructions:</strong> {instructions}
              </p>
              <h5>Ingredients:</h5>
              <ul className="list-group list-group-flush">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">
                    {ingredient} - {measures[index] || ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CocktailDetails);
