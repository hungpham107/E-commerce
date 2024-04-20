import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[40rem] lg:w-[40rem] md:-[46rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="mb-8">
                <img
                  src={image}
                  alt={name}
                  className="w-[40rem] h-[20rem] rounded-lg object-cover"
                />

                <div className="mt-4 flex justify-between">
                  <div className="w-[30rem]">
                    <h2 className="text-lg font-bold mb-2">{name}</h2>
                    <p className="text-gray-700 mb-4">${price}</p>
                    <p className="text-gray-600">
                      {description.substring(0, 170)}...
                    </p>
                  </div>

                  <div className="w-[30rem]">
                    <div className="flex flex-col">
                      <h1 className="flex items-center mb-2">
                        <FaStore className="mr-2" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaClock className="mr-2" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2" /> Reviews: {numReviews}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaShoppingCart className="mr-2" /> Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaBox className="mr-2" /> In Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};
export default ProductCarousel;
