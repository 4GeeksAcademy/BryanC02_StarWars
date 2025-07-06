import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then(res => res.json())
      .then(data => setPeople(data.results))
      .catch(err => console.error("Error fetching people:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Star Wars Characters</h1>
      <div className="d-flex overflow-auto gap-3 px-3" style={{ whiteSpace: "nowrap" }}>
        {people.map((character) => (
          <div key={character.uid} className="col-md-4 mb-3">
            <div className="card" style={{height: "300px", minWidth: "200px"}}>
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                className="card-img-top mb-5"
                alt={character.name}
              />
              <div className="card-body">
                <h5 className="card-title mt-5">{character.name}</h5>
                <button
                  className="btn btn-outline-primary ms-auto"
                  onClick={() =>
                    dispatch({ type: "ADD_FAVORITE", payload: character })
                  }
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
