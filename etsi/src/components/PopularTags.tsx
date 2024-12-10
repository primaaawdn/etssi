"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductType } from "@/types";

type Props = {
	products: ProductType[];
};

const PopularTags: React.FC<Props> = ({ products }) => {
	const [randomTags, setRandomTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const findRandomTags = () => {
			if (!products || products.length === 0) {
				setRandomTags([]);
				return;
			}

			const tags = products.flatMap((product: ProductType) => product.tags);
			const uniqueTags = Array.from(new Set(tags)); 

			const randomTagsArray: string[] = [];
			while (randomTagsArray.length < 5 && uniqueTags.length > 0) {
				const randomIndex = Math.floor(Math.random() * uniqueTags.length);
				randomTagsArray.push(uniqueTags.splice(randomIndex, 1)[0]);
			}

			setRandomTags(randomTagsArray);
		};

		findRandomTags();
		setLoading(false);
	}, [products]);

	if (loading) {
		return (
			<div className="my-8 px-4 py-5 bg-white text-center">
				<p className="text-gray-500">Loading tags...</p>
			</div>
		);
	}

	if (randomTags.length === 0) {
		return (
			<div className="my-8 px-4 py-5 bg-white text-center">
				<p className="text-gray-500">No tags available.</p>
			</div>
		);
	}

	return (
		<div className="my-8 px-4 py-5 bg-white">
			<h2 className="text-2xl text-black font-bold mb-4">Popular Tags</h2>
			<div className="grid grid-cols-5 gap-4">
				{randomTags.map((tag, index) => (
					<div
						key={index}
						className="relative group flex shadow-md text-center p-2 rounded-lg flex-col items-center justify-center border-1 border-orange-500 h-32">
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
