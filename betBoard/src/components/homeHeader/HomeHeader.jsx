import styles from './HomeHeader.module.css';
import { FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }
    const handleRegisterClick = () => {
        navigate('/register');
    }
    const handleAboutClick = () => {
        navigate('/about');
    }
    const handleHelpClick = () => {
        navigate('/help');
    }
    const handlePremiumClick = () => {
        navigate('/premium');
    }
    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <div className={styles.homeHeader}>
            <div className={styles.homeHeaderTitle} onClick={handleLogoClick}>
                <FiTrendingUp className={styles.logoIcon} />
                BetBoard
            </div>
            <div className={styles.headerActions}>
                <div className={styles.menuGroup}>
                    <button className={styles.premiumButton} onClick={handlePremiumClick}>Premium</button>
                    <button className={styles.helpButton} onClick={handleHelpClick}>Help</button>
                    <button className={styles.aboutUsButton} onClick={handleAboutClick}>About Us</button>
                </div>
                <div className={styles.authGroup}>
                    <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
                    <button className={styles.registerButton} onClick={handleRegisterClick}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;