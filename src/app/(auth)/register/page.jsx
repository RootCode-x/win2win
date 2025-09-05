import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/registerForm";
import Navbar from "@/components/navbar/Navbar";

const RegisterPage = () => {
  return (
    
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
        <RegisterForm/>
      </div>
    </div>
  );
};

export default RegisterPage;
