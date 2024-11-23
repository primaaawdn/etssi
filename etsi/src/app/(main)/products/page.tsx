"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ProductType } from "@/types";
import SearchBar from "@/components/SearchBar";
import InfiniteScrollComponent from "@/components/InfiniteScrollComponent";

const ProductsPage = () => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [page, setPage] = useState<number>(2);
	const [searchQuery, setSearchQuery] = useState<string>("");
	// console.log(products);

	const fetchProducts = useCallback(
        async (reset = false) => {
            try {
                setLoading(true);
                const response = await fetch(
                    `/api/products?page=${reset ? 1 : page}&query=${searchQuery}`
                );
                const data = await response.json();

                if (reset) {
                    setProducts(data);
                } else {
                    setProducts((prevProducts) => [...prevProducts, ...data]);
                }

                setHasMore(data.length > 0);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        },
        [page, searchQuery]
    );

	useEffect(() => {
        fetchProducts(true);
    }, [searchQuery]);

    useEffect(() => {
        if (page > 1) {
            fetchProducts();
        }
    }, [page]);

	return (
		<div className="px-4 py-5 bg-white">
			<h2 className="text-3xl font-semibold text-black text-center mb-8">
				Browse Products
			</h2>
			<div className="max-w-7xl mx-auto py-10 px-6">
				<SearchBar onSearch={(query) => setSearchQuery(query)} />
				<InfiniteScrollComponent
					products={products}
					setPage={setPage}
					hasMore={hasMore}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default ProductsPage;
