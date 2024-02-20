import { createContext, useState } from 'react';

export const FavoriteContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {}
});

function FavoriteContextProvider({children}) {

    const [favoriteMealsIds, setFavoriteMealsIds] = useState([]);

    function addFavorite(id) {        
        setFavoriteMealsIds((current) => [...favoriteMealsIds, id]  );
    }

    function removeFavorite(id) {
        setFavoriteMealsIds((current) => current.filter( mealId !== id ) );
    }

    const value = { 
        ids: favoriteMealsIds,
        addFavoriteMeal: addFavorite,
        removeFavoriteMeal: removeFavorite
    };

    <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}

export default FavoriteContextProvider;