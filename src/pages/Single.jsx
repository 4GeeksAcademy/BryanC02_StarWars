import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Single = () => {
  const { theId, type } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const apiType = type === "people" ? "people" : "planets";

    fetch(`https://www.swapi.tech/api/${apiType}/${theId}`)
      .then((res) => res.json())
      .then((data) => setItem(data.result))
      .catch((err) => {
        console.error("Error fetching:", err);
        setItem({ error: true });
      });
  }, [theId, type]);

  if (item?.error) return <div className="text-danger text-center mt-5">Failed to load item.</div>;
  if (!item) return <div className="text-center mt-5 display-4">Loading...</div>;

  const imgType = type === "people" ? "characters" : "planets";

  return (
    <div className="container text-center mt-5">
      <img
        src={`https://starwars-visualguide.com/assets/img/${imgType}/${item.uid}.jpg`}
        onError={(e) =>
        (e.target.src =
          "https://media.timeout.com/images/105863223/750/562/image.jpg")
        }
        className="card-img-top rounded"
        alt={item.properties.name}
        style={{ width: "299px", height: "200px", objectFit: "cover" }}
      />

      <h1 className="mb-3">{item.properties.name}</h1>
      <p>{item.description}</p>
      <hr />

      <div className="row text-danger fw-bold">
        {type === "people" ? (
          <>
            <div className="col">Birth Year: {item.properties.birth_year}</div>
            <div className="col">Gender: {item.properties.gender}</div>
            <div className="col">Height: {item.properties.height}</div>
            <div className="col">Skin Color: {item.properties.skin_color}</div>
            <div className="col">Eye Color: {item.properties.eye_color}</div>
          </>
        ) : (
          <>
            <div className="col">Population: {item.properties.population}</div>
            <div className="col">Climate: {item.properties.climate}</div>
            <div className="col">Terrain: {item.properties.terrain}</div>
            <div className="col">Diameter: {item.properties.diameter}</div>
            <div className="col">Orbital Period: {item.properties.orbital_period}</div>
          </>
        )}
      </div>

      <Link to="/" className="btn btn-primary mt-4">
        ← Back to Home
      </Link>
    </div>
  );
};

export default Single;
