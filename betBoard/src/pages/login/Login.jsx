import styles from './Login.module.css';
import { useState } from 'react';
import AuthController from '../../controllers/authController';
import { FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        setLoading(true);
        try {
            await AuthController.loginUser(formData);
            setSuccess('Login realizado com sucesso!');
            setTimeout(() => {
                navigate('/dashboard'); // ou onde você quiser redirecionar após login
            }, 1500);
        } catch (err) {
            setError('E-mail ou senha incorretos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className={`${styles.loginContainer}`}>
            <button 
                className={styles.homeButton} 
                onClick={handleHomeClick}
                type="button"
            >
                <FaHome />
            </button>
            
            <div className="container-fluid p-0">
                <div className="row justify-content-center align-items-center min-vh-100 m-0">
                    <div className="col-auto">
                        <form className={`${styles.loginForm} row g-0`} onSubmit={handleSubmit}>
                            <div className={`col-12 col-lg-7 ${styles.formLeft}`}>
                                <h2 className={styles.loginTitle}>Fazer Login</h2>
                                
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className={styles.inputField}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className={`mb-3 ${styles.passwordInputWrapper}`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Senha"
                                        className={styles.inputField}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <span
                                        className={styles.passwordToggleIcon}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                
                                {error && <div className={`${styles.formMessage} mb-3`} style={{ color: '#ff5555' }}>{error}</div>}
                                {success && <div className={`${styles.formMessage} mb-3`} style={{ color: '#0fbc20' }}>{success}</div>}
                                
                                <button type="submit" className={`${styles.loginButton} w-100`} disabled={loading}>
                                    {loading ? 'Entrando...' : 'Entrar'}
                                </button>
                                
                                <div className={`${styles.registerLink} mt-4 text-center`}>
                                    <span className={styles.registerLinkText}>
                                        Não tem uma conta?{' '}
                                        <button 
                                            type="button" 
                                            className={styles.registerLinkButton}
                                            onClick={handleRegisterClick}
                                        >
                                            Cadastre-se aqui
                                        </button>
                                    </span>
                                </div>
                            </div>
                            
                            <div className={`col-12 col-lg-5 ${styles.formRight}`}>
                                <div className={styles.formRightContent}>
                                    <span className={styles.formRightText}>
                                        Bem-vindo de volta ao BetBoard! <br /> Faça seu login e continue sua jornada.
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;