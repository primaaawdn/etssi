import React from "react";
import Image from "next/image";
import { ProductType } from "@/types";
import { formatPrice } from "@/utils/formatPrice";

interface ProductCardProps {
	product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
	<div className="card shadow-md text-center p-4 rounded-xl flex flex-col items-center">
		<Image
			src={product.thumbnail || `https://i.etsystatic.com/44161790/r/il/cccab9/5661463628/il_794xN.5661463628_j338.jpg`}
			alt={`${product.name} thumbnail`}
			width={300}
			height={300}
			className="rounded-xl w-full h-40 object-cover mb-2"
		/>
		<h3 className="font-semibold text-black text-lg truncate max-h-[3rem] leading-[1.5rem] w-full">
			{product.name}
		</h3>

		<p className="text-black">{formatPrice(product.price)}</p>
	</div>
);

export default ProductCard;
