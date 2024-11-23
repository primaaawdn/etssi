import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ProductType } from "@/types";

interface InfiniteScrollComponentProps {
    products: ProductType[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasMore: boolean;
    loading: boolean;
}

const InfiniteScrollComponent = ({
    products,
    setPage,
    hasMore,
}: InfiniteScrollComponentProps) => {

    {products.map((product) => {
        return (
            <Link key={product._id?.toString() || product.slug} href={`/products/${product.slug}`}>
                <ProductCard product={product} />
            </Link>
        );
    })}
    
    return (
        <InfiniteScroll
            dataLength={products.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<p className="text-center mt-7 text-gray-500">Loading more products...</p>}
            endMessage={<p className="text-center mt-7 text-red-500 text-base">No more products to show</p>}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link key={product._id?.toString() || product.slug} href={`/products/${product.slug}`}>
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default InfiniteScrollComponent;
