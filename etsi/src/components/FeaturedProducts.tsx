import React from "react";
import { ProductType } from "@/types";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { shuffleArray } from "@/utils/shuffleArray";

interface FeaturedProductsProps {
	products: ProductType[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
	if (!response.ok) throw new Error("Failed to fetch products");

	let products = await response.json();
	// console.log("Featured Prods:", products);
	
	products = shuffleArray(products);

	return (
		<div className="my-8 px-4 py-5 bg-white">
			<h2 className="text-2xl text-black font-bold mb-4">Featured Products</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{products.slice(0, 5).map((product: ProductType) => (
					<Link key={product._id?.toString()} href={`/products/${product.slug}`}>
						<ProductCard product={product} />
					</Link>
				))}
			</div>
			<div className="text-center mt-6">
				<Link
					href="/products"
					className="btn bg-orange-500 text-white px-4 py-2 rounded border border-orange-500 hover:bg-yellow-500 hover:border-yellow-500 focus:bg-yellow-500">
					See All Products
				</Link>
			</div>
		</div>
	);
};

export default FeaturedProducts;
