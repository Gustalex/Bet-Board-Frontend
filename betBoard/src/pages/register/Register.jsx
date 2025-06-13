import styles from './Register.module.css';
import { useState } from 'react';
import AuthController from '../../controllers/authController';

const Register = () => {
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

        setLoading(true);
        try {
            await AuthController.registerUser(formData);
            setSuccess('Cadastro realizado com sucesso!');
            setFormData({
                full_name: '',
                cpf: '',
                email: '',
                password: '',
                confirm_password: '',
                phone: '',
            });
        } catch (err) {
            setError('Erro ao registrar. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <div className={styles.formLeft}>
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Nome completo"
                        className={styles.inputField}
                        value={formData.full_name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        className={styles.inputField}
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        className={styles.inputField}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Telefone"
                        className={styles.inputField}
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        className={styles.inputField}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirme a senha"
                        className={styles.inputField}
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                        required
                    />
                    {error && <div className={styles.formMessage} style={{ color: '#ff5555' }}>{error}</div>}
                    {success && <div className={styles.formMessage} style={{ color: '#0fbc20' }}>{success}</div>}
                    <button type="submit" className={styles.registerButton} disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar'}
                    </button>
                </div>
                <div className={styles.formRight}>
                    <div className={styles.formRightContent}>
                        <span className={styles.formRightText}>
                            Bem-vindo ao BetBoard! <br /> Faça seu cadastro e aproveite a experiência.
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;