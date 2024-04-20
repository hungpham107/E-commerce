import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import { useEffect } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);
  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      // remove the product from the local storage as well
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      // add the product to the local storage as well
      addFavoriteToLocalStorage(product);
    }
  };
  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-2 right-5 cursor-pointer "
    >
      {isFavorite ? (
        <FaHeart
          className="text-pink-600"
          style={{
            border: "2px solid black",
            borderRadius: "50%", // Đảm bảo border theo hình dạng tròn của biểu tượng trái tim
            padding: "2px", // Điều chỉnh độ dày của border
            fontSize: "20px",
          }}
        />
      ) : (
        <FaRegHeart
          className="text-white"
          style={{
            border: "2px solid black",
            borderRadius: "50%", // Đảm bảo border theo hình dạng tròn của biểu tượng trái tim
            padding: "2px", // Điều chỉnh độ dày của border
            fontSize: "20px",
          }}
        />
      )}
    </div>
  );
};
export default HeartIcon;
