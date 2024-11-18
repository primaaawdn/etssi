"use client";

import styles from "./Register.module.css";

const RegisterForm: React.FC = () => {
	return (
		<form className={styles.form} 
		// onSubmit={handleSubmit}
		>
			<div className={styles.formGroup}>
				<label className={styles.label} htmlFor="name">First Name</label>
				<input
					type="text"
					id="name"
					name="name"
					// value={formData.name}
					// onChange={handleChange}
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
					// value={formData.email}
					// onChange={handleChange}
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
					// value={formData.password}
					// onChange={handleChange}
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
