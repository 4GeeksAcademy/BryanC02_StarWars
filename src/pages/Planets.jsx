import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Planets = () => {
    const { store, dispatch, addFavorite } = useGlobalReducer();
    const [planets, setPlanets] = useState([]);

    const alreadyFav = store.favorites.some(fav => fav.planet?.id === planets.id);

    useEffect(() => {
        // Fetch planets
        fetch("https://www.swapi.tech/api/planets")
            .then((res) => res.json())
            .then((data) => {
                const planetUrls = data.results.map((planet) => planet.url);

                // Fetch each planet’s full data in parallel
                Promise.all(
                    planetUrls.map((url) =>
                        fetch(url)
                            .then((res) => res.json())
                            .then((detailed) => detailed.result)
                    )
                ).then((fullPlanetData) => setPlanets(fullPlanetData));
            })
            .catch((err) => console.error("Failed to fetch full planet info", err));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Planets</h2>
            <div className="d-flex flex-row flex-nowrap gap-2 px-2 overflow-auto">
                {planets.map((planet) => (
                    <div key={planet.properties.uid} className="me-2">
                        <div className="card" style={{ height: "390px", width: "300px" }}>
                            <img
                                src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                                className="card-img-top rounded-1"
                                alt={planet.properties.name}
                                onError={(e) => (e.target.src = "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg")}
                                style={{ width: "299px", height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {planet.properties.name}
                                </h5>
                                <p>
                                    Population: {planet.properties.population} <br />
                                    Terrain: {planet.properties.terrain}
                                </p>
                                <div className="mt-auto d-flex justify-content-between gap-2">
                                    <Link to={`/single/planet/${planet.uid}`}>
                                        <button className="btn btn-outline-primary btn-sm ms-auto">More Info</button>
                                    </Link>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => {
                                            dispatch({ type: "ADD_FAVORITE", payload: planet })
                                            alert(`${planet.properties.name} added to favorites!`);
                                        }}
                                    >
                                        ❤️
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!alreadyFav) {
                                                addFavorite("planet", planet.uid);
                                            } else {
                                                alert(`${planet.properties.name} is already in favorites`);
                                            }
                                        }}
                                    >
                                        {alreadyFav ? "❤️ Favorited" : "🤍 Favorite"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};