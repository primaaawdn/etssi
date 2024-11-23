import ProductImage from "@/components/ProductImage";
import Wishlist from "@/components/Wishlist";
import Product from "@/db/models/product";
import { WishlistType } from "@/types";
import { formatName } from "@/utils/formatName";
import { formatPrice } from "@/utils/formatPrice";

export async function generateMetadata({ params }: { params: { slug: string } }) {
	try {
		const product = await Product.findBySlug(params.slug);

		if (!product) {
			return {
				title: "Product Not Found",
				description: "The requested product could not be found.",
			};
		}

		return {
			title: `${formatName(product.name)} - Shop Now`,
			description: product.excerpt || "Find the best products on our store.",
			openGraph: {
				title: `${formatName(product.name)} - Shop Now`,
				description: product.excerpt || "Find the best products on our store.",
				images: product.images ? product.images.map((image: string) => ({ url: image })) : [],
			},
			twitter: {
				card: "summary_large_image",
				title: `${formatName(product.name)} - Shop Now`,
				description: product.excerpt || "Find the best products on our store.",
				images: product.images ? [product.images] : [],
			},
		};
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "Error",
			description: "An error occurred while loading the product details.",
		};
	}
}

const ProductDetailPageSSR = async ({ params }: { params: { slug: string } }) => {
	try {
		const product = await Product.findBySlug(params.slug);

		if (!product) {
			return <div>Product not found</div>;
		}

		const productData = {
			...product,
			_id: product._id,
		};

		return (
			<div className="min-h-screen bg-white flex justify-center items-center">
				<div className="max-w-7xl mx-auto py-10 px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div className="flex justify-center items-center">
							<ProductImage product={productData} />
						</div>

						<div className="px-4 flex flex-col justify-center">
							<h1 className="text-2xl font-bold text-gray-900 mb-6">
								{formatName(productData.name)}
							</h1>
							<p className="text-gray-600">
								<strong>Description:</strong> {productData.description}
							</p>
							<p className="text-gray-600">
								<strong>Excerpt:</strong> {productData.excerpt}
							</p>
							<p className="text-gray-800 text-lg font-semibold">
								<strong>Price:</strong> {formatPrice(productData.price)}
							</p>
							<div>
								<h6 className="text-gray-800 font-semibold">Tags:</h6>
								<ul className="flex flex-wrap gap-2 mt-2">
									{productData.tags.map((tag: string) => (
										<li
											key={tag}
											className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
											{tag}
										</li>
									))}
								</ul>
							</div>
					<div className="relative mt-6">
						<Wishlist productId={productData._id as unknown as WishlistType} />
					</div>

						</div>
					</div>

				</div>
			</div>
		);
	} catch (error) {
		console.error("Error fetching product:", error);
		return <div>Error fetching product details.</div>;
	}
};

export default ProductDetailPageSSR;
export const dynamic = 'force-dynamic'