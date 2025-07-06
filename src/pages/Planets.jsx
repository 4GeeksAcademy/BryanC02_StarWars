import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Planets = () => {
    const { store, dispatch } = useGlobalReducer();
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        // Fetch planets
        fetch("https://www.swapi.tech/api/planets")
            .then((res) => res.json())
            .then((data) => setPlanets(data.results))
            .catch((err) => console.error("Error fetching planets:", err));
    }, []);

    return (
        <div className="container">
            <h2 className="mt-5">Planets</h2>
            <div className="d-flex overflow-auto gap-3" style={{ whiteSpace: "nowrap" }}>
                {planets.map((planet) => (
                    <div
                        key={planet.uid}
                        className="card"
                        style={{height: "200px", minWidth: "200px"}}
                    >
                        <img
                            src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                            className="card-img-top"
                            alt={planet.name}
                            onError={(e) => (e.target.style.display = "none")}
                        />
                        <div className="card-body mt-5">
                            <h5 className="card-title">{planet.name}</h5>
                            <button
                                className="btn btn-outline-success"
                                onClick={() =>
                                    dispatch({ type: "ADD_FAVORITE", payload: planet })
                                }
                            >
                                + Add to Favorites
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};