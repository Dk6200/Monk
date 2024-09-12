import React, { useEffect, useState } from "react";
import Delete from "../Assets/Vector (1).png";
import { FaSearch } from "react-icons/fa";
import data from "./Pdata.json";
import { useDispatch } from "react-redux";
import { addProducts } from "../redux/actions"; // Import the action

function Productmenu() {
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch(); // Dispatcher from Redux

  useEffect(() => {
    setCategories(data.categories);
  }, []);

  // Handling category click (all products selection/deselection)
  const handleCategoryClick = (category) => {
    const newSelectedProducts = { ...selectedProducts };

    const areAllProductsSelected = category.products.every(
      (product) => selectedProducts[product.id]
    );

    category.products.forEach((product) => {
      if (areAllProductsSelected) {
        delete newSelectedProducts[product.id]; // Deselect all products
      } else {
        newSelectedProducts[product.id] = product; // Select the full product data
      }
    });

    setSelectedProducts(newSelectedProducts);
  };

  // Handling single product checkbox change
  const handleProductCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (newSelected[product.id]) {
        delete newSelected[product.id]; // Deselect product
      } else {
        newSelected[product.id] = product; // Select product data
      }

      return newSelected;
    });
  };

  const selectedProductCount = Object.keys(selectedProducts).length;

  const handleDeleteClick = () => {
    setIsVisible(false);
  };

  const isCategoryIndeterminate = (category) => {
    const selectedProductIds = category.products.map((product) => product.id);
    const selectedProductCount = selectedProductIds.filter(
      (id) => selectedProducts[id]
    ).length;
    return (
      selectedProductCount > 0 &&
      selectedProductCount < category.products.length
    );
  };

  const isCategorySelected = (category) => {
    return category.products.every((product) => selectedProducts[product.id]);
  };

  const handleAddClick = () => {
    dispatch(addProducts(selectedProducts)); // Dispatch full product data to Redux
    console.log("Selected Products added to store: ", selectedProducts); // Log in the console
  };

  if (!isVisible) {
    return null;
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
        {categories.map((category) => (
          <div
            key={category.category}
            className="flex items-center border-b border-customBorder p-2 cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <label className="p-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-white"
                checked={isCategorySelected(category)}
                onChange={() => handleCategoryClick(category)}
                ref={(el) => {
                  if (el) {
                    el.indeterminate = isCategoryIndeterminate(category);
                  }
                }}
              />
            </label>
            <p className="p-2">{category.header.heading}</p>
          </div>
        ))}

        {categories.map(
          (category) =>
            category.products.some(
              (product) => selectedProducts[product.id]
            ) && (
              <div key={category.category} className="p-4 space-y-4">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center border-b border-gray-300 py-2 space-x-4"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 bg-text-600 border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-white"
                      checked={!!selectedProducts[product.id]}
                      onChange={() => handleProductCheckboxChange(product)}
                    />

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
            )
        )}
      </div>

      <div className="Footer flex justify-between items-center p-4">
        <p>Products Selected: {selectedProductCount}</p>
        <div className="Buttons flex justify-between items-center">
          <button className="text-customGrey bg-white px-5 py-1 rounded mr-4 border-customGrey">
            Cancel
          </button>
          <button
            className="text-white bg-green-700 px-5 py-1 rounded"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productmenu;
