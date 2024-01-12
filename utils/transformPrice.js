export const transformPrice = (price) => {
  if (price && typeof price === "string" && price[0] === "$") {
    return Number(price.slice(1));
  }
};
