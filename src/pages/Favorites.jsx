import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (character) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: character });
  };

  return (
    <div className="container mt-5">
      <h1>Favorites ({store.favorites.length})</h1>

      {store.favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul className="list-group">
          {store.favorites.map((char, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              <span>{char.name}</span>
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${char.uid}.jpg`}
                alt={char.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <button className="btn btn-danger btn-sm" onClick={() => handleRemove(char)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link to="/" className="btn btn-primary mt-3">← Back to Home</Link>
    </div>
  );
};

export default Favorites;