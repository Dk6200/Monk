import React, { useState } from "react";
import Productmenu from "../Component/Productmenu";
import ProductInput from "../Component/Productinput";

function Products() {
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState({});

  const handleAddProducts = (products) => {
    setSelectedProducts(products);
    setShowProductMenu(false); // Close product menu after selection
  };

  const toggleProductMenu = () => {
    setShowProductMenu((prevState) => !prevState);
  };

  return (
    <div className="w-[800px] h-auto bg-white p-4 mx-auto">
      <div className="text-lg font-bold mb-4">
        <p className="px-4 py-1">Add Discount</p>
        <ProductInput
          number={1}
          placeholder="Search products"
          onEditClick={toggleProductMenu}
          products={selectedProducts} // Pass selected products here
        />
      </div>

      {showProductMenu && (
        <div className="mt-4">
          <Productmenu onAddClick={handleAddProducts} />
        </div>
      )}
    </div>
  );
}

export default Products;
