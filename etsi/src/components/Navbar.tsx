"use client";

import React, { useState, useEffect } from "react";
import {
	HeartIcon,
	GiftIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const Navbar: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = Cookies.get("token");
		setIsLoggedIn(!!token); 
	}, []);

	const handleLogout = () => {
		Cookies.remove("token");
		setIsLoggedIn(false);
		window.location.href = "/login";
	};

	return (
		<div className="navbar bg-white shadow-md sticky top-0 z-10">
			<div className="flex-1">
				<div className="flex items-center">
					<Link href="/">
						<Image src="/logo.svg" alt="Logo" width={100} height={100} />
					</Link>
				</div>
			</div>
			<div className="flex-none gap-4">
				<div>
					{isLoggedIn && (
						<button className="btn btn-circle btn-ghost">
							<Link href="/wishlist">
								<HeartIcon className="w-6 h-6 text-black" />
							</Link>
						</button>
					)}
					<button className="btn btn-circle btn-ghost">
						<GiftIcon className="w-6 h-6 text-black" />
					</button>
					<button className="btn btn-circle btn-ghost">
						<ShoppingCartIcon className="w-6 h-6 text-black" />
					</button>
				</div>
				<div className="mr-8 text-black text-lg font-medium">
					{isLoggedIn ? (
						<button onClick={handleLogout} className="text-black">
							Sign Out
						</button>
					) : (
						<Link href="/login">Sign In</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
