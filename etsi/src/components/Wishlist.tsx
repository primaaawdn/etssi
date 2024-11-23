"use client";
import { useState, useEffect, useCallback } from "react";
import { WishlistType } from "@/types";

interface WishlistProps {
	productId: WishlistType;
}

export default function Wishlist({ productId }: WishlistProps) {
	const [isAdded, setIsAdded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const fetchWishlistStatus = useCallback(async (token: string) => {
		setInitialLoading(true);
		try {
			const response = await fetch(`/api/wishlists`, {
				method: "GET",
				headers: {
					Cookie: `token=${token}`,
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const data = await response.json();
				const isInWishlist = data.some((item: WishlistType) => {
					return String(item.productId) === String(productId);
				});
				setIsAdded(isInWishlist);
			} else {
				console.error(
					"Failed to fetch wishlist status:",
					await response.text()
				);
				if (response.status === 401) {
					setError("Unauthorized. Please log in.");
				}
			}
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setInitialLoading(false);
		}
	}, [productId]);

	useEffect(() => {
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("token="))
			?.split("=")[1];

		if (token) {
			setIsLoggedIn(true);
			fetchWishlistStatus(token);
		} else {
			setIsLoggedIn(false);
			setInitialLoading(false);
		}
	}, [fetchWishlistStatus]);

	const handleWishlistToggle = async () => {
		setLoading(true);
		try {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("token="))
				?.split("=")[1];

			if (!token) {
				throw new Error("Token not found. Please log in.");
			}

			const response = await fetch("/api/wishlists", {
				method: isAdded ? "DELETE" : "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ productId }),
			});

			if (response.ok) {
				setIsAdded(!isAdded);
			} else {
				console.error("Failed to update wishlist:", await response.text());
				if (response.status === 401) {
					setError("Unauthorized. Please log in.");
				} else {
					setError("Failed to update wishlist. Please try again.");
				}
			}
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{error && <div className="error-message">{error}</div>}

			{isLoggedIn && (
				<button
					onClick={handleWishlistToggle}
					disabled={loading || initialLoading}
					className="text-sm px-4 py-2 rounded-md text-white bg-orange-700 border border-orange-500 hover:bg-green-900 hover:border-green-900 transition duration-200">
					{initialLoading
						? "Loading..."
						: loading
						? "Processing..."
						: isAdded
						? "Remove from Wishlist"
						: "Add to Wishlist"}
				</button>
			)}
		</div>
	);
}
