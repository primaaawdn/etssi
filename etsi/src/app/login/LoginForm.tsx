"use client";

import React, { useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setError("");
		setMessage("");

		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
				{
					method: "POST",
                    // headers: { "Content-Type": "multipart/form-data" },
					body: formData,
				}
			);

			const data = await response.json();
			// console.log("Login data:", data);
            
			if (response.ok && data.message) {
				setMessage(data.message || "Login successful!");
                
				document.cookie = `token=${data.token}; path=/; max-age=${
					30 * 24 * 60 * 60
				}; secure=${process.env.NODE_ENV === "production"}`;

                router.push("/");
			} else {
				setError(data.error);
			}
		} catch (error) {
			setError("An error occurred during login.");
			console.error("Login error:", error);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.formGroup}>
				<label className={styles.label} htmlFor="email">
					Email Address
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={styles.input}
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<label className={styles.label} htmlFor="password">
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={styles.input}
					required
				/>
			</div>
			<button type="submit" className={styles.submitButton}>
				Login
			</button>

			{error && <div className={styles.error}>{error}</div>}
			{message && <div className={styles.success}>{message}</div>}
		</form>
	);
};

export default LoginForm;
