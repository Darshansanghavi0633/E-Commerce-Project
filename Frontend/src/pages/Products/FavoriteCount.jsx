import React from 'react'

import { useSelector } from "react-redux";

const FavoriteCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-4 top-10">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoriteCount;