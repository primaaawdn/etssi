import BannerCSR from "./Banner";


const Banner = () => {
	const promos = [
		{
			title: "Buy 1 Get 1 Free on All Items",
			description: "Hurry, limited time offer!",
		},
		{
			title: "20% Off on Your First Purchase",
			description: "Sign up today to get started.",
		},
		{
			title: "Free Shipping on Orders Over $50",
			description: "Enjoy free shipping, no code required!",
		},
	];

	return <BannerCSR promos={promos} />;
};

export default Banner;
