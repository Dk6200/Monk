import React from "react";
import Edit from "../Assets/Group.png";
import Icon from "../Assets/Group 669.png";
import Cross from "../Assets/Vector (1).png";

const ProductInput = ({ number, placeholder, onEditClick, products }) => {
  const selectedProductCount = Object.keys(products).length;

  return (
    <div className="text-lg font-bold mb-4">
      {/* Product Input Section */}
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <img src={Icon} alt="Icon" className="w-2 h-3" />
          <p className="text-lg">{number}.</p>
          <div className="relative flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder={placeholder}
              className="border rounded-md py-2 px-4 flex-1 font-bold text-[14px] text-[#00000080] w-[400px]"
              value={Object.values(products)
                .map((product) => `${product.name} ($${product.price})`)
                .join(", ")} // Display product names and prices
              readOnly
            />
            <img
              src={Edit}
              alt="edit icon"
              className="absolute right-2 h-4 w-4 cursor-pointer"
              onClick={onEditClick}
            />
          </div>
        </div>
      </div>

      {/* Products with Discounts Section */}
      <div className="mt-4 ml-8">
        {Object.values(products).map((product, index) => (
          <div
            key={index}
            className="flex space-x-3 items-center mb-2 text-[14px] font-normal"
          >
            <img src={Icon} alt="icon" />
            <div className="border border-gray-500 px-4 py-0 rounded-full w-64 ml-16">
              <p className="font-semibold">
                {product.name} - ${product.price.toFixed(2)}
              </p>
            </div>

            <input
              type="text"
              className="border px-2 py-0 w-16 text-center rounded-full"
              // Handle value logic here
            />

            <span className="text-black border border-gray-500 rounded-full w-14 flex items-center justify-center">
              %
            </span>
            <img
              src={Cross}
              alt="CrossButton"
              className="w-3 h-3 hover:fill-blue-500"
            />
          </div>
        ))}

        {/* Container for the button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onEditClick}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Another Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInput;
