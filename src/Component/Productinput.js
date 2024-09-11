import React from "react";
import Edit from "../Assets/Group.png";
import Icon from "../Assets/Group 669.png"; // Assuming you're using the same icon

const ProductInput = ({ number, placeholder, onEditClick }) => {
  return (
    <div className="text-lg font-bold mb-4">
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2 ">
          <img src={Icon} alt="Icon" className="w-2 h-3" />
          <p className="text-lg">{number}.</p>
          <div className="relative flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder={placeholder}
              className="border rounded-md py-2 px-4 flex-1 font-light text-[14px] text-[#00000080] w-[400px];
]"
            />
            {/* Edit icon triggers onEditClick */}
            <img
              src={Edit}
              alt="edit icon"
              className="absolute right-2 h-4 w-4 cursor-pointer"
              onClick={onEditClick}
            />
          </div>
        </div>
        <button className="text-white bg-green-700 px-4 rounded font-light">
          Add Discount
        </button>
      </div>
    </div>
  );
};

export default ProductInput;
