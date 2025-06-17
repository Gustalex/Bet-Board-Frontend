import styles from './Register.module.css';
import { useState } from 'react';
import AuthController from '../../controllers/authController';
import { FaEye, FaEyeSlash, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        cpf: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formatCPF = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = cleanedValue.replace(/(\d{3})(\d)/, '$1.$2');
        formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2');
        formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return formattedValue;
    };

    const formatPhone = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = cleanedValue;
        if (cleanedValue.length > 10) {
            formattedValue = cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            formattedValue = cleanedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return formattedValue;
    }

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatPhone(value);
        setFormData((prev) => ({
            ...prev,
            phone: formattedValue,
        }));
        if (formattedValue.length > 15) {
            e.target.value = formattedValue.slice(0, 15);
        } else {
            e.target.value = formattedValue;
        }
    }

    const handleCPFChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatCPF(value);
        setFormData((prev) => ({
            ...prev,
            cpf: formattedValue,
        }));
        if (formattedValue.length > 14) {
            e.target.value = formattedValue.slice(0, 14);
        } else {
            e.target.value = formattedValue;
        }
    };

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

        if (formData.password !== formData.confirm_password) {
            setError('As senhas não coincidem.');
            return;
        }

        const cleanData = {
            ...formData,
            cpf: formData.cpf.replace(/\D/g, ''),
            phone: formData.phone.replace(/\D/g, ''),
        };

        setLoading(true);
        try {
            await AuthController.registerUser(cleanData);
            setSuccess('Cadastro realizado com sucesso!');
            setFormData({
                full_name: '',
                cpf: '',
                email: '',
                password: '',
                confirm_password: '',
                phone: '',
            });
            
            setTimeout(() => {
                navigate('/login');
            }, 500);
            
        } catch (err) {
            setError('Erro ao registrar. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleHomeClick = () => {
        navigate('/');
    };
    return (
        <div className={`${styles.registerContainer}`}>
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
                        <form className={`${styles.registerForm} row g-0`} onSubmit={handleSubmit}>
                            <div className={`col-12 col-lg-7 ${styles.formLeft}`}>
                                <h2 className={styles.registerTitle}>Criar Conta</h2>
                                
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="Nome completo"
                                        className={styles.inputField}
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="cpf"
                                        placeholder="CPF"
                                        className={styles.inputField}
                                        value={formData.cpf}
                                        onChange={handleCPFChange}
                                        required
                                    />
                                </div>
                                
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
                                
                                <div className="mb-3">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Telefone"
                                        className={styles.inputField}
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
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
                                
                                <div className={`mb-3 ${styles.passwordInputWrapper}`}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirm_password"
                                        placeholder="Confirme a senha"
                                        className={styles.inputField}
                                        value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <span
                                        className={styles.passwordToggleIcon}
                                        onClick={toggleConfirmPasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                
                                {error && <div className={`${styles.formMessage} mb-3`} style={{ color: '#ff5555' }}>{error}</div>}
                                {success && <div className={`${styles.formMessage} mb-3`} style={{ color: '#0fbc20' }}>{success}</div>}
                                
                                <button type="submit" className={`${styles.registerButton} w-100`} disabled={loading}>
                                    {loading ? 'Registrando...' : 'Registrar'}
                                </button>
                            </div>
                            
                            <div className={`col-12 col-lg-5 ${styles.formRight}`}>
                                <div className={styles.formRightContent}>
                                    <span className={styles.formRightText}>
                                        Bem-vindo ao BetBoard! <br /> Faça seu cadastro e aproveite a experiência.
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

export default Register;