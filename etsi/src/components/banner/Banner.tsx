"use client";
import { useState } from "react";

interface Promo {
	title: string;
	description: string;
}

interface BannerCSRProps {
	promos: Promo[];
}

const BannerCSR: React.FC<BannerCSRProps> = ({ promos }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextPromo = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length);
	};

	const prevPromo = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + promos.length) % promos.length
		);
	};

	return (
		<div className="relative max-w-full overflow-hidden">
			<div className="carousel w-full">
				<div className="carousel-item w-full">
					<div className="relative w-full bg-gradient-to-r from-orange-600 to-orange-200 text-white py-12">
						<div className="text-center">
							<h2 className="text-3xl font-bold mb-4">
								{promos[currentIndex].title}
							</h2>
							<p className="text-xl">{promos[currentIndex].description}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute inset-y-0 left-0 flex items-center justify-between px-4">
				<button
					className="btn bg-orange-500 text-white px-4 py-2 rounded border border-orange-500 hover:bg-yellow-500 hover:border-yellow-500 focus:bg-yellow-500 focus:border-yellow-500"
					onClick={prevPromo}>
					‹
				</button>
			</div>
			<div className="absolute inset-y-0 right-0 flex items-center justify-between px-4">
				<button
					className="btn bg-orange-500 text-white px-4 py-2 rounded border border-orange-500 hover:bg-yellow-500 hover:border-yellow-500 focus:bg-yellow-500 focus:border-yellow-500"
					onClick={nextPromo}>
					›
				</button>
			</div>
		</div>
	);
};

export default BannerCSR;
