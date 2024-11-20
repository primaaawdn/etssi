export const formatPrice = (price: number): string => {
	if (typeof price !== "number") {
		return "Input must be a number";
	}
	return "Rp " + price.toLocaleString("id-ID");
};
