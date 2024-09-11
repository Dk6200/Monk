import React, { useEffect, useState } from "react";
import Delete from "../Assets/Vector (1).png";
import { FaSearch } from "react-icons/fa";
import data from "./Pdata.json";

function Productmenu() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set categories from data.categories
    setCategories(data.categories);
  }, []);

  // Handle category checkbox change
  const handleCategoryClick = (category) => {
    const isSelected = selectedCategoryIds.includes(category.category);
    if (isSelected) {
      // Deselect category and all products in it
      setSelectedCategoryIds(
        selectedCategoryIds.filter((id) => id !== category.category)
      );
      setSelectedProducts((prevSelected) => {
        const updatedProducts = { ...prevSelected };
        category.products.forEach((product) => {
          delete updatedProducts[product.id];
        });
        return updatedProducts;
      });
    } else {
      // Select category and all products in it
      setSelectedCategoryIds([...selectedCategoryIds, category.category]);
      setSelectedProducts((prevSelected) => {
        const updatedProducts = { ...prevSelected };
        category.products.forEach((product) => {
          updatedProducts[product.id] = true;
        });
        return updatedProducts;
      });
    }
  };

  // Handle individual product selection
  const handleProductCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => ({
      ...prevSelected,
      [productId]: !prevSelected[productId],
    }));
  };

  const handleDeleteClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // If isVisible is false, render nothing (hide the component)
  }

  return (
    <div className="border-b border-customBorder bg-white m-auto mt-3 w-custom-width">
      <div className="flex justify-between items-center p-3 border-b border-customBorder">
        <h1 className="text-xl">Select products</h1>
        <img
          src={Delete}
          alt="Delete"
          className="w-3 h-3"
          onClick={handleDeleteClick}
        />
      </div>
      <div className="relative w-full p-2 m-auto border-b border-customBorder">
        <input
          type="text"
          placeholder="Search product"
          className="border rounded-md p-2 pl-10 w-full"
        />
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 items-center" />
      </div>

      <div className="p-4 space-y-4">
        {/* Render categories */}
        {categories.map((category) => (
          <div key={category.category}>
            <div
              className="flex items-center border-b border-customBorder p-2 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <label className="p-2">
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(category.category)}
                  onChange={() => handleCategoryClick(category)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
              </label>
              <p className="p-2">{category.header.heading}</p>
            </div>

            {/* Render products if the category is selected */}
            {selectedCategoryIds.includes(category.category) && (
              <div className="p-4 space-y-4">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center border-b border-gray-300 py-2 space-x-4"
                  >
                    {/* Checkbox for product */}
                    <input
                      type="checkbox"
                      checked={selectedProducts[product.id] || false}
                      onChange={() => handleProductCheckboxChange(product.id)}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    />

                    {/* Product Details */}
                    <div className="flex justify-between w-full">
                      <p className="font-semibold flex-1">{product.name}</p>
                      <div className="flex justify-between space-x-4">
                        <p className="text-sm text-gray-600 flex-1 text-left whitespace-nowrap">
                          {product.availability} available
                        </p>
                        <p className="text-sm font-bold flex-1 text-right">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="Footer flex justify-between items-center p-4">
        <p>Products Selected</p>
        <div className="Buttons flex justify-between items-center">
          <button className="text-customGrey bg-white px-5 py-1 rounded mr-4 border-customGrey">
            Cancel
          </button>
          <button className=" text-white bg-green-700 px-5 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productmenu;
