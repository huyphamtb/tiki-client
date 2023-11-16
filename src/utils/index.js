export const formatNumber = (x) => {
  if (x && x !== "null" && x !== "undefined") {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
};

export const getSalePrice = (price, percent) => {
  return Math.ceil((price / 100) * (100 - percent));
};

export const splitFullName = (fullName) => {
  const partials = fullName.split(" ");

  return {
    last_name: partials.pop(),
    first_name: partials.join(" "),
  };
};
