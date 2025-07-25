import { useEffect } from 'react';
import { FaHeart, FaRegHeart} from 'react-icons/fa';

import {useSelector, useDispatch} from 'react-redux';
import {addToFavorites,removeFromFavorites,setFavorites} from '../../redux/features/Favorites/favoriteSlice';
import {addFavoriteToLocalStorage,getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage} from '../../Utils/localStorage'


const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites)||[];
    const isFavorite = favorites.some((f) => f._id === product._id); // Check if the product is already in favorites

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, [dispatch]);    

    const toggleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product));      // Remove product from Redux state
            removeFavoriteFromLocalStorage(product._id);     // Remove product from localStorage
        } else {
            dispatch(addToFavorites(product));          // Add product to Redux state
            addFavoriteToLocalStorage(product);         // Add product to localStorage
        }
    };

  return (
     <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="" />
      )}
    </div>
  )
}

export default HeartIcon