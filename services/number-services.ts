export const seperateThousands = (x: Number | string) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
