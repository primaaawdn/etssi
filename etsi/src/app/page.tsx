import FeaturedProducts from "@/components/FeaturedProducts";
import Detail from "../components/Detail";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Banner from "../components/banner";
import PopularTags from "@/components/PopularTags";

export default async function Home() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/products`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}
	);
  if (!response.ok) {return null}

  const products = await response.json();

	return (
		<main>
			<Navbar />
			<Banner />
			<FeaturedProducts products={products}/>
			<PopularTags products={products}/>
			<Detail />
			<Footer />
		</main>
	);
}
export const dynamic = 'force-dynamic'