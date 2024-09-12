const initialState = {
  selectedProducts: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return {
        ...state,
        selectedProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
