import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistReducer';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="py-8">
      <h1 className="text-center mb-5 text-2xl font-semibold">Wishlist</h1>
      <div className="container px-5 lg:px-0 py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {wishlist.length > 0 ? (
            wishlist.map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      className="lg:h-80 h-96 w-full"
                      src={productImageUrl}
                      alt="product"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        E-bharat
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price}
                      </h1>
                      <div className="flex justify-center mt-4">
                        <button
                          className="bg-red-500 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold"
                          onClick={() => handleRemoveFromWishlist(id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No items in wishlist</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
