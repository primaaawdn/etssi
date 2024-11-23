"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductType } from "@/types";

type Props = {
	products: ProductType[];
};

const PopularTags: React.FC<Props> = () => {
	const [randomTags, setRandomTags] = useState<string[]>([]);
	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
			if (!response.ok) {
				setProducts([]);
				return;
			}

			const fetchedProducts = await response.json();
			setProducts(fetchedProducts);
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		const findRandomTags = () => {
			if (!products || products.length === 0) return;

			const tags = products.flatMap((product: ProductType) => product.tags);

			const randomTagsArray: string[] = [];
			for (let i = 0; i < 5; i++) {
				const randomIndex = Math.floor(Math.random() * tags.length);
				randomTagsArray.push(tags[randomIndex]);
			}

			setRandomTags(randomTagsArray);
		};

		if (products.length > 0) {
			findRandomTags();
		}
	}, [products]);

	return (
		<div className="my-8 px-4 py-5 bg-white">
			<h2 className="text-2xl text-black font-bold mb-4">Popular Tags</h2>
			<div className="grid grid-cols-5 gap-4">
				{" "}
				{randomTags.map((tag, index) => (
					<div
						key={index}
						className="relative group flex shadow-md text-center p-2 rounded-lg flex-col items-center justify-center border-1 border-orange-500 h-32" 
					>
						<Image
							src={`https://i.etsystatic.com/44161790/r/il/cccab9/5661463628/il_794xN.5661463628_j338.jpg`}
							alt={tag}
							width={80}
							height={80}
							className="rounded-full"
						/>
						<p className="mt-2 text-center text-black text-sm">{tag}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default PopularTags;
