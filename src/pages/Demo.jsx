import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then(res => res.json())
      .then((data) => {
        const fetchDetails = data.results.map((char) =>
          fetch(`https://www.swapi.tech/api/people/${char.uid}`)
            .then((res) => res.json())
            .then((fullData) => fullData.result)
        );

        Promise.all(fetchDetails)
          .then((fullCharacters) => setPeople(fullCharacters))
          .catch((err) => console.error("Error fetching full character info:", err));
      })
      .catch(err => console.error("Error fetching people:", err));
  }, []);


  return (
    <div className="container mt-5">
      <h1 className="text-center">Star Wars Characters</h1>
      <div className="d-flex flex-row flex-nowrap gap-2 px-2 overflow-auto">
        {people.map((character) => (
          <div key={character.uid} className="me-2">
            <div className="card" style={{ height: "380px", width: "300px" }}>
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                onError={(e) => (e.target.src = "https://lumiere-a.akamaihd.net/v1/images/anakin-skywalker-main_23e5105b.jpeg?region=503%2C1%2C1074%2C803")}
                className="card-img-top rounded"
                alt={character.properties.name}
                style={{ width: "299px", height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {character.properties.name}
                </h5>
                <p>
                  Hair-Color: {character.properties.hair_color} <br />
                  Eye-Color: {character.properties.eye_color}
                </p>
                <div className="mt-auto d-flex justify-content-between gap-2">
                  <Link to={`/single/people/${character.uid}`}>
                    <button className="btn btn-outline-primary btn-sm">
                      More Info
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => {
                      const alreadyFav = store.favorites.some((fav) => fav.uid === character.uid);
                      if (!alreadyFav) {
                        dispatch({
                          type: "ADD_FAVORITE",
                          payload: { ...character, type: "character" } // ✅ set correct type
                        });
                        alert(`${character.properties.name} added to favorites!`);
                        } else {
                        alert(`${character.properties.name} is already in favorites!`);
                      }
                    }}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
