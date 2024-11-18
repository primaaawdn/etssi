import RegisterForm from "./RegisterForm";
import styles from "./Register.module.css";
import Image from "next/image";

const RegisterPage: React.FC = () => {
	return (
		<div className={styles.container}>
			<Image 
				src="/logo.svg" 
				alt="Logo" 
				className={styles.logo} 
				width={200} 
				height={100} 
			/>
			<h1 className={styles.title}>Create your account</h1>
			<h3 className={styles.subtitle}>Registration is easy</h3>
			<RegisterForm />
			<h5 className={styles.subsubtitle}>Already have an account? Sign in here</h5>
		</div>
	);
};

export default RegisterPage;