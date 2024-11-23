"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types";

interface ProductProps {
	product: ProductType;
}

const ProductImage = ({ product }: ProductProps) => {
	const [mainImage, setMainImage] = useState(product.thumbnail);

	const handleThumbnailClick = (image: string) => {
		setMainImage(image);
	};

	return (
		<div className="flex flex-col items-center justify-items-center">
			<div className="flex space-x-6 my-auto justify-center items-center">
				<div className="flex flex-col space-y-4">
					{product.images.map((image, index) => (
						<div
							key={index}
							className="cursor-pointer"
							onClick={() => handleThumbnailClick(image)}>
							<Image
								src={image}
								alt={`Product Image ${index + 1}`}
								width={50}
								height={50}
								className="w-15 h-15 rounded-md shadow-md object-cover transition-all hover:scale-105"
							/>
						</div>
					))}
				</div>

				<Image
					src={mainImage}
					alt={product.name}
					width={300}
					height={300}
					className="h-auto rounded-lg shadow-md"
				/>
			</div>
		</div>
	);
};

export default ProductImage;
