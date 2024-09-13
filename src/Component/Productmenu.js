import React, { useEffect, useState } from "react";
import Delete from "../Assets/Vector (1).png";
import { FaSearch } from "react-icons/fa";
import data from "./Pdata.json";

function Productmenu({ onAddClick }) {
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCategories(data.categories);
  }, []);

  const handleCategoryCheckboxChange = (category) => {
    const someSelected = category.products.some(
      (product) => selectedProducts[product.id]
    );

    // Determine whether to select or deselect all products in this category
    const shouldSelect = !someSelected;

    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };
      category.products.forEach((product) => {
        if (shouldSelect) {
          newSelected[product.id] = product;
        } else {
          delete newSelected[product.id];
        }
      });
      return newSelected;
    });
  };

  const handleProductCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[product.id]) {
        delete newSelected[product.id];
      } else {
        newSelected[product.id] = product;
      }
      return newSelected;
    });
  };

  const selectedProductCount = Object.keys(selectedProducts).length;

  const handleDeleteClick = () => {
    setIsVisible(false);
  };

  const handleAddClick = () => {
    onAddClick(selectedProducts);
    setIsVisible(false); // Close menu after adding
  };

  const filteredCategories = categories.map((category) => ({
    ...category,
    products: category.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 items-center" />
      </div>

      <div className="p-4 space-y-4">
        {filteredCategories.map((category) => {
          // Determine if all products in the category are selected
          const allSelected = category.products.every(
            (product) => selectedProducts[product.id]
          );
          // Determine if any product in the category is selected
          const someSelected = category.products.some(
            (product) => selectedProducts[product.id]
          );

          return (
            <div key={category.category}>
              <div className="flex items-center border-b border-customBorder p-2 cursor-pointer">
                <label className="p-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-white"
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onChange={() => handleCategoryCheckboxChange(category)}
                  />
                </label>
                <p className="p-2">{category.header.heading}</p>
              </div>

              <div className="p-4 space-y-4">
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
                      <div className="flex justify-between space-x-">
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
            </div>
          );
        })}
      </div>

      <div className="Footer flex justify-between items-center p-4">
        <p>Products Selected: {selectedProductCount}</p>
        <div className="Buttons flex justify-end space-x-4">
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productmenu;
