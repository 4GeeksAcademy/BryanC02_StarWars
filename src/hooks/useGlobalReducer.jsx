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

// Provider component
export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
const useGlobalReducer = () => useContext(GlobalContext);
export default useGlobalReducer;
