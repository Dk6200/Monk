import React, { useState } from "react";
// import Icon from "../Assets/Group 669.png";
// import Edit from "../Assets/Group.png";
import Productmenu from "./Productmenu";
import ProductInput from "./Productinput";

function Products() {
  // State to control the visibility of the Productmenu
  const [showProductMenu, setShowProductMenu] = useState(false);

  // Handler to toggle the visibility of Productmenu
  const handler = () => {
    setShowProductMenu((prevState) => !prevState);
  };

  return (
    <div className="w-[800px] h-auto bg-customBackground p-4 mx-auto">
      <div className="text-lg font-bold mb-4">
        <p className="px-4 py-1">Add Discount</p>
        <ProductInput
          number={1}
          placeholder="Search products"
          onEditClick={handler}
        />
        {/*
         <ProductInput
          number={2}
          placeholder="Search products"
          onEditClick={handler}
        />
        <ProductInput
          number={3}
          placeholder="Search products"
          onEditClick={handler}
        />
      */}
      </div>

      {/* Conditionally render Productmenu */}

      {showProductMenu && (
        <div className="mt-4">
          <Productmenu />
        </div>
      )}
    </div>
  );
}

export default Products;
