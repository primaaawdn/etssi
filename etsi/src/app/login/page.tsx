import LoginForm from "./LoginForm";
import styles from "./Login.module.css";
import Image from "next/image";

const LoginPage: React.FC = () => {
	return (
		<div className={styles.container}>
			<Image 
				src="/logo.svg" 
				alt="Logo" 
				className={styles.logo} 
				width={200} 
				height={100} 
			/>
			<h1 className={styles.title}>Login</h1>
			<LoginForm />
			<h5 className={styles.subsubtitle}>New here? Create account</h5>
		</div>
	);
};

export default LoginPage;