import { useReducer, useContext, createContext } from "react";

// Initial state
const initialState = {
  favorites: []
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.includes(action.payload)) return state;
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(item => item !== action.payload)
      };
    default:
      return state;
  }
};

// Create context
const GlobalContext = createContext();

const addFavorite = async (type, itemId) => {
  const userId = 1; // Still hardcoded for now
  const url = `https://bookish-barnacle-4jvv5vrqj59wcq5rj-3000.app.github.dev/favorite/${type}/${itemId}`;

  try {
    const res = await fetch(url, {
      method: "POST",
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Favorite added:", data);
    } else {
      console.error("Failed to add favorite", await res.json());
    }
  } catch (err) {
    console.error("Error adding favorite", err);
    console.log("Calling addFavorite:", type, itemId);
  }
};


// Provider component
export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch, addFavorite }}>
      {children}
    </GlobalContext.Provider>
  );
};


// Custom hook
const useGlobalReducer = () => useContext(GlobalContext);
export default useGlobalReducer;
