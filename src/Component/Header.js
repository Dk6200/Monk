import React from "react";
import Logo from "../Assets/Monk.png";
// import Productlist from "./Productlist";
import Products from "./Products";
// import Products from "./Products";

// import ProductForm from "./Products";

function Header() {
  return (
    <div>
      <div className="flex p-2 border-b border-customBorder">
        <img src={Logo} alt="logo" />
        <p className="text-customGrey py-1 px-1 ">Monk Upsell & Cross-sell</p>
      </div>
      <div className="w-custom-width  bg-customBackground m-auto mt-5">
        <Products />
      </div>
    </div>
  );
}

export default Header;
