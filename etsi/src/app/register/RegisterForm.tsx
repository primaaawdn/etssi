"use client";

import { useState } from "react";
import styles from "./Register.module.css";

const RegisterForm: React.FC = () => {

    const [formData, setFormData] = useState({
        name: "",
		username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        // console.log("response", response);
        

        const data = await response.json();
        if (data.success) {
            window.location.href = "/login";
            // console.log("User created successfully");
        } else {
            console.error("Error creating user:", data.error);
        }

        // console.log("Form Data Submitted:", formData);

    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">First Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input} 
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                    type="username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.input} 
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input} 
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input} 
                    required
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
