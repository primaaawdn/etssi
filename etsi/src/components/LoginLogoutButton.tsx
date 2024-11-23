import { useState } from "react";
import Link from "next/link";

function LoginLogoutButton() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const toggleLogin = () => {
		setIsLoggedIn(!isLoggedIn);
	};
    

	return (
		<div className="mr-8 text-black text-lg font-medium">
			{isLoggedIn ? (
				<button onClick={toggleLogin}>Logout</button>
			) : (
				<Link href="/login">Sign In</Link>
			)}
		</div>
	);
}

export default LoginLogoutButton;
