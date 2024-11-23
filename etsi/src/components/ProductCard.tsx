import React from "react";
import Image from "next/image";
import { ProductType } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { formatName } from "@/utils/formatName";
import Wishlist from "@/components/Wishlist";

interface ProductCardProps {
	product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
	<div className="card shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl text-center p-4 rounded-xl flex flex-col items-center justify-between w-full bg-white hover:bg-gray-50">
		<div className="relative w-full">
			<Image
				src={
					product.thumbnail ||
					`https://i.etsystatic.com/44161790/r/il/cccab9/5661463628/il_794xN.5661463628_j338.jpg`
				}
				alt={`${product.name} thumbnail`}
				width={300}
				height={300}
				className="rounded-xl w-full h-40 object-cover mb-4"
				loading="lazy"
			/>
		</div>
		<h3 className="font-semibold text-black text-lg truncate max-h-[3rem] leading-[1.5rem] w-full mb-2">
			{formatName(product.name)}
		</h3>
		<p className="text-xl font-bold text-gray-800 mb-4">
			{formatPrice(product.price)}
		</p>
		<Wishlist productId={product._id?.toString() || ""} />
	</div>
);

export default ProductCard;
