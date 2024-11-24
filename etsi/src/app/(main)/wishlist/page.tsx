"use client";

import React, { useState, useEffect } from "react";
import { ProductType } from "@/types";
import ProductCard from "@/components/ProductCard";
import Cookies from "js-cookie";

const WishlistPage = () => {
	const [wishlist, setWishlist] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchWishlist = async () => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`, {
				method: "GET",
			});

			const data = await res.json();
			if (res.ok) {
				setWishlist(data);
			} else {
				console.error("Failed to fetch wishlist:", data.error);
			}
		} catch (error) {
			console.error("Error fetching wishlist:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) {
			window.location.href = "/login";
		} else {
			fetchWishlist();
		}
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="px-4 py-5 bg-white">
			<h2 className="text-3xl font-semibold text-black text-center mb-8">
				Your Wishlist
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{wishlist.length > 0 ? (
					wishlist.map((product) => (
						<ProductCard key={product._id?.toString()} product={product} />
					))
				) : (
					<p>No products in your wishlist.</p>
				)}
			</div>
		</div>
	);
};

export default WishlistPage;
