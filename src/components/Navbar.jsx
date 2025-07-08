import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg" style={{ height: "50px", width: "100px" }} />
				</Link>
				<div className="ml-auto">
					<Link to="/favorites">
						<button className="btn btn-dark">❤️Favorites</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};