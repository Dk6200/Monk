export const addProducts = (products) => {
  console.log(products);
  return {
    type: "ADD_PRODUCTS",
    payload: products,
  };
};
